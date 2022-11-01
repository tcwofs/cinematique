#!/usr/bin/env sh

set -e
npm run build
cd dist
echo > .nojekyll

git init
git checkout -B main
git add -A
git commit -m 'update'

git push -f git@github.com:tcwofs/cinematique.git main:gh-pages

cd -
