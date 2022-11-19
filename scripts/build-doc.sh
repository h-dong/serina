#!/bin/bash

# clean up docs folder
rm -rf docs/*
mkdir -p docs/

# copy over html file
cp public/index.html docs/

# copy over library
cp -R dist/serina.umd.js docs/
cp -R dist/serina.umd.js.map docs/
