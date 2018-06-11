import { Rabbit } from './rabbit';
import { Redis } from './redis';
import { Channel } from 'amqplib/callback_api';


const queue = 'task';
const rabbit = new Rabbit();
const redis = new Redis();


Promise.all([rabbit.initConnection(queue), redis.initConnection()]).then(connections => {
  const channel: Channel = connections[0].channel;
  channel.consume(queue, data => {
    const parsedData = (JSON.parse(data.content.toString()));
    this.redis.saveInRedisAndPublish(parsedData);
  }, { noAck: false });
});


