#!/bin/sh


echo "# Downloading the docker install script"
sudo apt-get purge docker lxc-docker docker-engine docker.io

sudo apt-get install  curl  apt-transport-https ca-certificates software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add 

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"


sudo apt-get update

sudo apt-get install docker-ce

echo "# verifying docker install status"
sudo systemctl status docker

echo "# Downloading the docker-compose"
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

echo "# Apply executable permissions to the docker compose binary"
sudo chmod +x /usr/local/bin/docker-compose

docker-compose --version

docker-compose


