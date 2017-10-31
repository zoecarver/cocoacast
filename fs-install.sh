#!/bin/bash

npm install react-native-fs
cd node_modules
rm -rf react-native-fs
git https://github.com/itinance/react-native-fs
cd react-native-fs
rm -rf .git*
