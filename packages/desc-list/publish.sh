#!/bin/bash
 yarn build
 npm login --registry=https://registry-npm.tuya-inc.top --scope=tuya-fe --always-auth
 npm publish --registry=https://registry-npm.tuya-inc.top  --scope=tuya-fe --always-auth
 