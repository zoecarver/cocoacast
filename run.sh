#!/bin/bash

start=`date +%s`
echo "entering android"
cd android
echo "cleaning"
./gradlew clean
echo "exiting directory"
cd ..
clear
end=`date +%s`
echo "cleaning took" $((end-start)) "seconds"
echo "
╔═╗╔═╗╔╦╗┌─┐┌─┐┌─┐┌┬┐
╠═╝║ ║ ║║│  ├─┤└─┐ │
╩  ╚═╝═╩╝└─┘┴ ┴└─┘ ┴
"
echo "building with gradlew 😒"
echo "Have fun!"
start=`date +%s`
react-native run-android
end=`date +%s`
echo "building and installing took" $((end-start)) "seconds or" $(((end-start)/60)) "minutes"