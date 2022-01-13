#!/bin/bash

rm -R ./src/main/resources/static
cd ./src/main/javascript/farkle-ui
npm install
ng build

cd -
rm -R ./build
rm -R ./bin
./gradlew build

cp ./build/libs/farkle-scorecard-*.jar ~/Downloads/