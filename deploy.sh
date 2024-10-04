#!/usr/bin/env sh

set -e

npm run build

cd dist

git add -A

git commit -m "New Deployment"

git push -f git@github.com:vintgram/babylonPlayground.git main:gh-pages

cd -