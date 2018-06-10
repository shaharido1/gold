import { appConfig } from "./config/appConfig";
const amqp = require('amqplib/callback_api');
const uuidv4 = require('uuid/v4');

console.log(appConfig.rabbitHost);
console.log(appConfig.rabbitPort);

amqp.connect(`amqp://rabbitmq:5672`, (err, conn)=> {
  if (err) {
    throw err
  }
  conn.createChannel((err, ch)=> {
    const q = 'task';
    let i =0;
    let id = uuidv4();

    ch.assertQueue(q);
    setInterval(() => {
      const msg = JSON.stringify({massage:`ms-${i}`, id:`${id}`});

      i++;
      console.log(msg);
      ch.sendToQueue(q, Buffer.from(msg), {persistent: true});
    }, 5000);
  });
});
