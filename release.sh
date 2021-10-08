#!/bin/bash
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "### Running Asset Scanner"

# see how many lines we are getting from the qa command. 7 means no errors were found.
ERRORS=$(npm run qa | wc -l) 

npm run qa

if [ $ERRORS == '7' ]; then
  printf "\n${GREEN}Asset Scanner Passed.${NC}\n"

  echo "### Building Game"
  webpack --env.prod  

  echo "### Game Built"
else
  printf "\n${RED}Asset Scanner Failed. Please fix errors above before building your release.${NC}\n"
fi