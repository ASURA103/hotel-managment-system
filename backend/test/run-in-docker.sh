#!/usr/bin/env sh
# LOCAL-TEST-ONLY — not used in production; safe to remove before deployment.
# Runs the backend test suite on Node 22 (the production Node version) inside Docker,
# against a throwaway MongoDB 7 container. Your host Node, node_modules and data are untouched;
# dependencies are installed into a Docker volume. Usage: sh test/run-in-docker.sh
set -eu
cd "$(dirname "$0")/.."

NET=dreamstay-test-net
MONGO=dreamstay-test-mongo

if ! docker network inspect "$NET" >/dev/null 2>&1; then
  docker network create "$NET" >/dev/null
fi
if [ -n "$(docker ps -aq -f "name=^${MONGO}$")" ]; then
  docker rm -f "$MONGO" >/dev/null
fi
docker run -d --rm --name "$MONGO" --network "$NET" mongo:7 >/dev/null

cleanup() {
  docker rm -f "$MONGO" >/dev/null
  docker network rm "$NET" >/dev/null
}
trap cleanup EXIT

docker run --rm --network "$NET" \
  -v "$PWD":/app \
  -v dreamstay-test-node-modules:/app/node_modules \
  -v dreamstay-test-npm-cache:/root/.npm \
  -w /app \
  -e TEST_MONGO_URL="mongodb://${MONGO}:27017" \
  -e MONGOMS_DISABLE_POSTINSTALL=1 \
  node:22-bookworm-slim \
  sh -c "node -v && npm ci --no-audit --no-fund --loglevel=error && npm test"
