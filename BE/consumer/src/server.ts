import { appConfig } from "./config/appConfig";
const amqp = require("amqplib/callback_api");

const redis = require("redis");
const client = redis.createClient({host: "redis"});
const multi = client.multi();

let data;

  setTimeout(() => {
    amqp.connect(`amqp://guest:guest@rabbitmq:5672`, (err, conn) => {
      conn.createChannel((err, ch) => {
        const q = "task";
        ch.assertQueue(q);
        console.log(` [*] Waiting for messages in ${q}`);
        ch.consume(q, (msg) => {
          data = (JSON.parse(msg.content.toString()));
          setTimeout(() => {
            saveInRedisAndPublish();
            ch.ack(msg);
          }, 1000);
        }, { noAck: false });
      });
    });

    function saveInRedisAndPublish() {
      const message = { key: `${appConfig.keyId}:${data.id}`, massage: data.massage };
      console.log("writing to redis:" + message);
      multi
          .hmset(`${appConfig.keyId}:${data.id}`, "massage", data.massage, (err, res) => {
            console.log("redis:" + res);
            if (err) {
              console.error(err);
            }
          })
          .publish(appConfig.publishToEnrich, JSON.stringify(message))
          .exec();
    }

  }, 10000);
