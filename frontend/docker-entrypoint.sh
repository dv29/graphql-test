#!/bin/sh

npm install
echo "Install finished."

exec "$@"
