#!/bin/bash

npm install react-native-material-kit
react-native link react-native-material-kit
npm install react-native-fs@2.5
react-native link react-native-fs
cd node_modules
rm -rf react-native-material-kit
git clone https://github.com/xinthink/react-native-material-kit
cd react-native-material-kit
rm -rf .git*
# cd ..
# rm -rf react-native-fs
# git clone git@github.com:itinance/react-native-fs.git
# cd react-native-fs
# rm -rf .git*
