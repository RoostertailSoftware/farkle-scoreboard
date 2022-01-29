# Farkle Scoreboard app

This app, currently, will only allow for a user to enter quickly the points scored in a game of Farkle.
### I currently do not know who ownes the copyright/trakemark on Farkle but I wil do that before I go live with anyting past personal use.

## System
1. Angular 12 - exclusively with material ui design icons and components.
2. Spring boot to serve UI
3. No DB currently 

## Installing
```
$> git pull https://github.com/RoostertailSoftware/farkle-scoreboard.git
```

## build
from main directory
```
$> ./build.sh
```
This will build the Angular/material UI and put it into `/src/main/resources/static`
then it will build a simple Spring/boot to serve the UI and put the resulting .jar file in `/build/lib/`

## run
```
$> java -jar /build/lib/farkle-scorecard*.jar
 or
$> ./run.sh
```
Then, direct your browser to `http://localhost:3000`

