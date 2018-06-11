import { appConfig } from "./config/appConfig";

const redis = require("redis");
const client = redis.createClient({host: "redis"});
const sub = redis.createClient({host: "redis"});
const multi = client.multi();



function subscribe(){
  sub.on( "message", (channel, message) => {
    try {
      const json = JSON.parse(message);
      addingThings(json);
    } catch (e) {
    }
  });
  sub.subscribe(appConfig.publishToEnrich);
}

function addingThings(data) {
  let newData;
  newData = {...data , status: 12, key: data.key.replace("raw", appConfig.publishToEnrich) };
  saveInRedisAndPublish(newData);
}

function saveInRedisAndPublish(newData) {

  const massage = {key: newData.key, massage: newData.massage, status: newData.status};
  // console.log(massage);
  multi
      .hmset(newData.key, "massage", newData.massage, "status", newData.status, (err, res) =>{
        if (err) { console.error(err) }
      })
      .publish(appConfig.publishToApollo, JSON.stringify(massage))
      .exec();
}

setTimeout(() => {
  subscribe();
}, 10000)
