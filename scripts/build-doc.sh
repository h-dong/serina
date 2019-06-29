#!/bin/bash

# clean up docs folder
rm -rf docs/*

# copy over html file
cp public/index.html docs

# copy over library
cp dist/serina.js docs
