FROM node:9.5.0-slim

WORKDIR /opt/app

COPY ./dist /opt/app/
COPY ./package.json /opt/app/

RUN npm install --production


CMD node server.js


