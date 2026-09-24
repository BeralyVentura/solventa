# Resultados y análisis - H4.3.1

## Contexto de ejecución

- Fecha: 24 de septiembre de 2026.
- Entorno: Docker Desktop 29.6.2 sobre macOS; ejecución local.
- Commit: `1a50feb8d83eeae66b2fd1977974567f9d347bfc`.
- Generador: imagen oficial `grafana/k6:latest`, en el mismo equipo físico.
- PostgreSQL 16 limitado a 2 CPU/2 GiB en todas las corridas.
- Duración: 2 minutos por nivel; 200, 500, 800, 1.100 y 1.400 TPS.
- Criterios: p95 <= 400 ms, p99 <= 800 ms y errores < 1%.
- Conversión del ASR: 10 millones / 2 horas = 1.388,89 perfiles/s.

Estos datos son evidencia local reproducible, no una ejecución AWS. Generador y
sistema compartieron el mismo equipo; sirven para comparar tácticas, no como
capacidad definitiva de producción.

## Escalamiento vertical

| CPU / memoria | TPS ofrecidos | TPS logrados | p95 ms | p99 ms | errores % | descartadas |
|---|---:|---:|---:|---:|---:|---:|
| 1 / 1 GiB | 200 | 200,01 | 3,02 | <=800* | 0,000 | 0 |
| 1 / 1 GiB | 500 | 500,01 | 1,06 | <=800* | 0,000 | 0 |
| 1 / 1 GiB | 800 | 800,01 | 0,96 | <=800* | 0,000 | 0 |
| 1 / 1 GiB | 1.100 | 1.099,99 | 1,40 | <=800* | 0,000 | 0 |
| 1 / 1 GiB | 1.400 | 1.372,88 | 5,89 | <=800* | 0,000 | 1.708 |
| 2 / 2 GiB | 200 | 200,00 | 2,32 | 4,43 | 0,000 | 0 |
| 2 / 2 GiB | 500 | 500,00 | 1,21 | 207,20 | 0,000 | 0 |
| 2 / 2 GiB | 800 | 798,09 | 1,15 | 107,83 | 0,000 | 227 |
| 2 / 2 GiB | 1.100 | 1.075,39 | 4,46 | 636,75 | 0,000 | 2.951 |
| 2 / 2 GiB | 1.400 | 1.390,13 | 1,53 | 130,42 | 0,000 | 1.083 |
| 3 / 3 GiB | 200 | 200,00 | 2,69 | 19,94 | 0,000 | 0 |
| 3 / 3 GiB | 500 | 500,00 | 1,01 | 3,06 | 0,000 | 0 |
| 3 / 3 GiB | 800 | 798,64 | 0,98 | 9,96 | 0,000 | 163 |
| 3 / 3 GiB | 1.100 | 1.099,43 | 1,30 | 11,75 | 0,000 | 70 |
| 3 / 3 GiB | 1.400 | 1.390,60 | 1,35 | 11,19 | 0,000 | 1.125 |

\* k6 aprobó el umbral p99 <= 800 ms, pero el primer resumen no conservó el
valor numérico. Se corrigió antes de las demás corridas; no se inventa el dato.

## Escalamiento horizontal

| Instancias | CPU / memoria c/u | TPS ofrecidos | TPS logrados | p95 ms | p99 ms | errores % | descartadas |
|---:|---|---:|---:|---:|---:|---:|---:|
| 3 | 1 / 1 GiB | 200 | 200,00 | 2,70 | 5,09 | 0,000 | 0 |
| 3 | 1 / 1 GiB | 500 | 499,88 | 2,20 | 14,90 | 0,000 | 0 |
| 3 | 1 / 1 GiB | 800 | 799,95 | 1,80 | 7,43 | 0,000 | 0 |
| 3 | 1 / 1 GiB | 1.100 | 1.089,20 | 3,27 | 120,37 | 0,403 | 1.294 |
| 3 | 1 / 1 GiB | 1.400 | 1.399,98 | 2,81 | 12,27 | 0,011 | 0 |

## Análisis

1. Todas las configuraciones aprobaron p95/p99 y mantuvieron errores bajo 1%.
2. La instancia de 1 CPU no sostuvo el objetivo: 1.372,88 perfiles/s es menor a
   1.388,89 y descartó 1.708 iteraciones.
3. Las verticales de 2 y 3 CPU superaron por poco la tasa mínima derivada, pero
   descartaron 1.083 y 1.125 iteraciones a 1.400 TPS.
4. Con recursos totales comparables (3 CPU/3 GiB), horizontal logró 1.399,98 TPS
   sin descartes; vertical logró 1.390,60 TPS con 1.125 descartes.
5. El p99 de 636,75 ms a 1.100 TPS/2 CPU evidencia variabilidad del equipo
   compartido. Cumple, pero debe repetirse en infraestructura controlada.

## Conclusión y decisión

La hipótesis queda **respaldada localmente**: varias instancias tras un
balanceador entregaron mayor throughput útil a recursos totales comparables. Se
recomienda escalar horizontalmente el módulo de perfilamiento y conservar el
escalamiento vertical como ajuste inicial o contingencia.

La tasa horizontal equivale a aproximadamente 10,08 millones de perfiles en 2
horas si se sostiene. Aún falta una corrida continua de 2 horas, medir a la vez
el canal en línea (no existe en el repositorio) y repetir en AWS con RDS/ALB.

## Evidencias

- JSON y logs locales: `experiments/h4.3.1/results/` en el equipo de ejecución
  (ignorados por Git por tamaño y variabilidad).
- Configuración versionada: Compose vertical/horizontal, Nginx, k6 y `run.sh`.
- Evidencia AWS, CloudWatch y enlace del video: pendiente de acceso a AWS.
