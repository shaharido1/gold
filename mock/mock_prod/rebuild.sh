#!/bin/bash
imageName=prod
containerName=prod

docker build -t $imageName -f Dockerfile  .

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run --net=be_default -e config_env=prod -e config_rabbitHost=rabbitmqmock -e config_batchNumber=100 --name $imageName $imageName

read -p "Press enter to continue"
