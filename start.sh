#!/bin/sh
set -e

echo "# Downloading the docker install script"
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

echo "# Downloading the docker-compose"
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

echo "# Apply executable permissions to the docker compose binary"
sudo chmod +x /usr/local/bin/docker-compose

docker-compose --version

docker-compose


