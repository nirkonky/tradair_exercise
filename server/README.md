# tradair

A Interview questions for nir konky tradair

## Requirements

Node.js v10.16.0
NPM v6.9.0
Docker 19

### Docker 
- #### Docker on Windows

  Download Docker for windows : https://hub.docker.com/?overlay=onboarding

- #### Docker on Ubuntu

  Download and install docker for Linux : https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04

## Install

    $ unzip the file into directory (your choose the directory).
    $ cd inside the choosen directory.
    $ docker build -t <your username>/node-web-app .

## Running the project

    $ docker run -p 49160:3000 -d <your username>/node-web-app
    $ now you can access the server via http://localhost:49160/

- #### If you need to go inside the container use command

    $ docker exec -it <container id> /bin/bash

## Running tests

    $ docker build -t <test name> -f Dockerfile.test .
    $ docker run --rm <test name>

    The result of the test will be printed into test > result > testResult.xml file.

