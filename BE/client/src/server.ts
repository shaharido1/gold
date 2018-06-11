import { appConfig } from "./config/appConfig";

const redis = require("redis");
const client = redis.createClient({host: "redis"});


function subscribe(){
  client.on( "message", (channel, message) => {
    try {
      const json = JSON.parse(message);
      console.log(json);
    } catch (e) {
    }
  });
  client.subscribe(appConfig.publishToApollo);
}

subscribe();
