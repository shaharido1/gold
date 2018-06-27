#!/bin/bash
imageName=consumer
containerName=consumer

docker build -t $imageName -f Dockerfile  .

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run --net=be_default -e config_redisHost=rabbitmq -e config_totalNumberOfRounds=100 -e config_batchNumber=100 -e config_redisHost=redis --name $containerName $imageName


read -p "Press enter to continue"
