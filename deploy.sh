#!/bin/bash

echo "🚀 Deploy iniciado..."

cd /home/padan/zenithstudio || exit

git pull origin main

npm install
npm run build

pm2 restart zenith

echo "✅ Deploy completado"
