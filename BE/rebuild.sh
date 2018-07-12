#!/bin/bash
imageName=enrich
containerName=enrich


echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker-compose -f docker-compose2.yml up --build docker-compose -f docker-compose2.yml up --build

read -p "Press enter to continue"
