# clean up dist folder
rm -rf dist/*
mkdir -p dist/

# Linting
npm run lint

# Testing
npm run test:build

# build
rollup --config rollup.config.js

# Remove extra *.d.ts files
rm -rf dist/esm/utils dist/esm/filters dist/cjs/utils dist/cjs/filters
