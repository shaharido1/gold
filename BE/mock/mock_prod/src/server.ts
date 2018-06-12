import { appConfig } from './config/appConfig';

const amqp = require('amqplib/callback_api');
const uuidv4 = require('uuid/v4');


setTimeout(() => {
  console.log("trying to connect to " + `amqp://guest:guest@${process.env.rabbitHost}:${process.env.rabbitPort}`);
  amqp.connect(`amqp://guest:guest@${process.env.rabbitHost}:${process.env.rabbitPort}`, (err, conn) => {
    if (conn) {
      console.log("connected to rabbitMQ")
      conn.createChannel((err, ch) => {
        const q = 'task';
        let i = 0;
        const id = uuidv4();

        ch.assertQueue(q);
        setInterval(() => {
          const msg = JSON.stringify({ massage: `ms-${i}`, id: `${id}` });
          i++;
          // console.log(msg);
          ch.sendToQueue(q, Buffer.from(msg), { persistent: true });
        }, 5000);
      });
    }
    else {
      if (err) {
        console.log("fail to connect")
        console.log(err)
      }
    }
  });
}, 10000);
