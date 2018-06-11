FROM node:9.5.0-slim

WORKDIR /opt/app

COPY . /opt/app/
RUN npm install

EXPOSE 3004

CMD npm run start:prod

