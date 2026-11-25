#!/usr/bin/env bash
set -euo pipefail

installer="$(dirname "$0")/../../installTorrServerLinux.sh"
source <(sed -n '/^getVersionTag() {$/,/^}$/p; /^getSpecificRelease() {$/,/^}$/p' "$installer")

VERSION_PREFIX=NextGen
REPO_API_URL=https://example.invalid
curl() {
  printf '%s' "$payload"
}

payload='{"tag_name":"NextGen.150"}'
result=$(getSpecificRelease 150)
[[ "$result" == NextGen.150 ]]

payload=$(printf '{"tag_name":"NextGen.150",\n"body":"%1048576s"}' '')
result=$(getSpecificRelease 150)
[[ "$result" == NextGen.150 ]]

payload=$(printf '{"tag_name":"NextGen.150","body":"%2097152s"}' '')
result=$(getSpecificRelease 150)
[[ -z "$result" ]]

for payload in '{"message":"Not Found"}' ''; do
  result=$(getSpecificRelease 9999)
  [[ -z "$result" ]]
done
