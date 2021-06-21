[![Travis CI Build Status](https://travis-ci.com/phillima/avisualizer.svg?branch=main)](https://travis-ci.com/phillima/avisualizer)
[![AVisualizer-Actions-Build](https://github.com/phillima/avisualizer/workflows/AVisualizer/badge.svg)](https://github.com/phillima/AVisualizer/actions)
[![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge&style=flat)](https://avisualizer.herokuapp.com/)

<h1 align = "center">Annotation Visualizer Desktop</h1>
<h2 align = "center"> A Standalone Version of AVisualizer </h2>

Introduction


This is the standalone desktop version of AVisualizer, built with [Electronjs](https://www.electronjs.org/)
### Installing Dependencies

To build the project install

`npm install -g --save-dev electron`

To create a executable app install

`npm install -g electron-packager --save-dev`

### Building app


To build the app use 

`electron-packager [Path] --platform=[Desired_OS]`

Where

* Path - is the path to avisualizer-frontend folder
* Desired_OS - the ose desired to build the app (win32=windows, linux=linux distros and darwin=macOS)


