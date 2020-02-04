FROM node:12

WORKDIR /var/www/app

RUN npm install -g nodemon

RUN npm install -g typescript

RUN npm install -g ts-node

COPY package.json package.json

COPY tsconfig.json tsconfig.json

COPY nodemon.json nodemon.json

COPY run_node.sh run_node.sh

COPY .env .env

RUN npm install