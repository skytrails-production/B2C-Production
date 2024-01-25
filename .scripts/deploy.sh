#!/bin/bash
set -e

echo "Deployment started..."

# Pull the latest version of the app
git pull origin main
echo "New changes copied to server !"

echo "Installing Dependencies..."
sudo npm install --force

echo "Creating Production Build..."
sudo npm run build

echo "Deployment Finished!"