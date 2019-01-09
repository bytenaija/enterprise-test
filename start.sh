#!/bin/sh


echo "# Downloading the docker install script"

sudo apt -y remove docker docker-engine docker.io && \

sudo apt -y update && \

sudo apt -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common && \

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add && \

sudo apt-key fingerprint 0EBFCD88 && \

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable" && \

sudo apt -y update && \

sudo apt -y install docker-ce && \

sudo docker run hello-world && \


echo "# Downloading the docker-compose" && \
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \

echo "# Apply executable permissions to the docker compose binary" && \

sudo chmod +x /usr/local/bin/docker-compose && \

docker-compose --version && \

docker-compose up -d


