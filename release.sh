#!/bin/bash
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color
echo "### Running Asset Scanner"

QA_OUTPUT=$(npm run qa  | tail -3 | head -n1)

npm run qa

ERRORS=$(echo $QA_OUTPUT | awk '{print $2}')

if [ $ERRORS == "0" ]; then
  printf "\n${GREEN}Asset Scanner Passed.${NC}\n"

  echo "### Building Game"
  webpack --env.prod  
else
  printf "\n${RED}Asset Scanner Failed. Please fix ${ERRORS} errors before building your release.${NC}\n"
fi