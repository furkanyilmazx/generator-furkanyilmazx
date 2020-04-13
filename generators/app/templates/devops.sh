#!/bin/bash

pm2 --version && \
yarn install && \
yarn build && \
cd dist && \
pm2-runtime start index.local.bundle.js
