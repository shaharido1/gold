#!/bin/bash
imageName=consumer
containerName=consumer

docker build -t $imageName -f Dockerfile  .

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run --net=be_default -e rabbitHost=rabbitmq -e rabbitPort=5672 -e redisEnv=redis --name consumer consumer


read -p "Press enter to continue"
