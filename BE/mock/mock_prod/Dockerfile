FROM node:9.5.0-slim

WORKDIR /opt/app/

COPY ./dist/ /opt/app
COPY ./config/ /opt/app/config/
COPY ./package.json /opt/app/

RUN npm install --production

CMD node mock/mock_prod/src/server.js


