# Resultados y análisis - H4.3.1

Estado: **pendiente de ejecución**. Este archivo no contiene resultados
simulados.

## Contexto de ejecución

- Fecha/hora UTC:
- Región y zona(s) AWS:
- Commit probado:
- Imagen ECR (tag/digest):
- Generador k6 (tipo EC2):
- PostgreSQL/RDS (clase y configuración):
- Duración por nivel y número de repeticiones:

## Escalamiento vertical

| CPU / memoria API | TPS ofrecidos | TPS logrados | p95 ms | p99 ms | errores % | iteraciones descartadas | ¿Cumple? |
|---|---:|---:|---:|---:|---:|---:|---|
| 1 / 1 GiB | 200 | | | | | | |
| 1 / 1 GiB | 500 | | | | | | |
| 1 / 1 GiB | 800 | | | | | | |
| 1 / 1 GiB | 1.100 | | | | | | |
| 1 / 1 GiB | 1.400 | | | | | | |
| 2 / 2 GiB | 200-1.400 | | | | | | |
| 3 / 3 GiB | 200-1.400 | | | | | | |

## Escalamiento horizontal

| Instancias | CPU / memoria por instancia | TPS ofrecidos | TPS logrados | p95 ms | p99 ms | errores % | descartadas | ¿Cumple? |
|---:|---|---:|---:|---:|---:|---:|---:|---|
| 3 | 1 / 1 GiB | 200 | | | | | | |
| 3 | 1 / 1 GiB | 500 | | | | | | |
| 3 | 1 / 1 GiB | 800 | | | | | | |
| 3 | 1 / 1 GiB | 1.100 | | | | | | |
| 3 | 1 / 1 GiB | 1.400 | | | | | | |

## Análisis y decisión (completar después de medir)

- Punto de saturación de cada configuración:
- Cuello de botella observado (API, balanceador, RDS o generador):
- Comparación a recursos totales equivalentes (3 CPU/3 GiB):
- ¿Se cumplen p95 <= 400 ms, p99 <= 800 ms y errores < 1% a 1.400 TPS?:
- ¿El throughput logrado sostiene los 1.388,89 perfiles/s requeridos?:
- Limitación: falta medir un canal en línea simultáneo para demostrar “sin
  afectarlo”.
- Decisión de arquitectura y evidencia que la soporta:
- Enlaces a video, JSON/CSV, CloudWatch y capturas:
