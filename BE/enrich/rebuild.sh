#!/bin/bash
imageName=enrich
containerName=enrich

docker build -t $imageName -f Dockerfile  .

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run --net=be_default -e rabbitHost=rabbitmq -e rabbitPort=5672 -e redisEnv=redis --name enrich enrich

read -p "Press enter to continue"
