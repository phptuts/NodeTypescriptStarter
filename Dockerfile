# Dockerfile
FROM node:12

# Or whatever Node version/image you want
WORKDIR '/var/www/app'

RUN npm install -g nodemon

RUN npm install -g typescript

RUN npm install -g ts-node

RUN npm install