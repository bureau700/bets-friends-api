#!/bin/bash

docker-compose build
docker-compose up -d
docker wait betsfriends-container-test
