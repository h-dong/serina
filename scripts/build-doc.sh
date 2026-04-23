#!/bin/bash

# clean up docs folder
rm -rf docs/*
mkdir -p docs/

# copy over html file
cp public/index.html docs/

# copy over library
cp dist/serina.module.js docs/
cp dist/serina.module.js.map docs/
