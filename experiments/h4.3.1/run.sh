#!/usr/bin/env bash
set -euo pipefail

mode="${1:-}"
if [[ "$mode" != "vertical" && "$mode" != "horizontal" ]]; then
  echo "Uso: npm run experiment:h431 -- vertical|horizontal"
  exit 2
fi

command -v docker >/dev/null || { echo "Falta Docker."; exit 1; }
command -v k6 >/dev/null || { echo "Falta k6."; exit 1; }

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
experiment_dir="$root_dir/experiments/h4.3.1"
compose_file="$experiment_dir/compose.$mode.yml"
result_dir="$experiment_dir/results/$mode/$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$result_dir"

cleanup() {
  docker compose -p "h431-$mode" -f "$compose_file" down
}
trap cleanup EXIT

docker compose -p "h431-$mode" -f "$compose_file" up -d --build
until curl --fail --silent http://localhost:8080/ >/dev/null; do sleep 2; done

run_offset=0
failed=0
for rate in ${RATES:-200 500 800 1100 1400}; do
  echo "Ejecutando nivel de carga: $rate TPS"
  if ! env BASE_URL="${BASE_URL:-http://localhost:8080}" \
    RATE="$rate" \
    RUN_OFFSET="$run_offset" \
    SUMMARY_FILE="$result_dir/summary-$rate-tps.json" \
    k6 run --out "csv=$result_dir/metrics-$rate-tps.csv" \
    "$experiment_dir/k6/reprocesamiento.js"; then
    failed=1
    echo "El nivel $rate TPS no cumplió uno o más umbrales; se continúa para conservar la curva completa."
  fi
  run_offset=$((run_offset + 100000000))
done

docker compose -p "h431-$mode" -f "$compose_file" logs --no-color > "$result_dir/containers.log"
echo "Evidencia guardada en $result_dir"
exit "$failed"
