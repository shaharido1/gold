FROM node:9.5.0-slim

WORKDIR /opt/app/

COPY ./dist /opt/app/
COPY ./package.json /opt/app/
COPY config /opt/app/

RUN npm install --production

CMD node enrich/src/server.js