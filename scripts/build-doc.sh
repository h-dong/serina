#!/bin/bash

# clean up docs folder
rm -rf docs/*
mkdir -p docs/

# copy over html file
cp public/index.html docs/

# copy over library
rollup --config rollup.config.js
cp -R dist/umd/* docs/
