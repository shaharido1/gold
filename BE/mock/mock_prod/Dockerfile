FROM node:9.5.0-slim

WORKDIR /opt/app

COPY ./dist /opt/app/
COPY ./package.json /opt/app/
RUN npm install

EXPOSE 3001

CMD node server.js


