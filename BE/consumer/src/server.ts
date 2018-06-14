import { appConfig } from './config/appConfig';

import { Rabbit } from '../../shared/rabbit';
import { Channel } from 'amqplib/callback_api';
import { Client, RedisSMQ } from 'rsmq';
import RSMQPromise from 'rsmq-promise';
import { RedisMqAdapter } from '../../shared/redis/redisMQ';


const reabbitQueueName = process.env.rabbitQueueName || 'task';
const redisQueueName = process.env.redisQueueName || 'task2';
const rabbit = new Rabbit();
const redis = new RedisMqAdapter();

Promise.all([redis.initRMSQ(redisQueueName), rabbit.initConnection(reabbitQueueName)]).then(connections => {
  const rsmq: RSMQPromise = connections[0];
  const rabbitChannel: Channel = connections[1].channel;
  const rabbitStartTime = new Date().getTime();

  rabbitChannel.consume(reabbitQueueName, data => {
    let avgTime = 0;
    let numberOfMsg = 0;

    const rabbitEnd = new Date().getTime();
    const rawData = data.content.toString();
    const parsedData = JSON.parse(rawData);
    console.log(parsedData.rabbitStart);
    if (rabbitStartTime > parsedData.start) { }
    else {
      const timeSec = (rabbitEnd - parsedData.rabbitStart) / 1000;
      numberOfMsg++;
      avgTime += timeSec;
      console.log(`batch ${numberOfMsg} time: ${(timeSec)} sec`);
      console.log(`avg time: ${(avgTime / numberOfMsg)} sec`);
      // redis.saveInRedis(parsedData.message, appConfig.keyId)
    }
    const redisStart = new Date().getTime();
    rsmq.sendMessage({ qname: redisQueueName, message: `{"message":${JSON.stringify(parsedData.message)} ,"start":${redisStart}}` }, (err, resp) => {
      if (resp) {
        // console.log('Message sent. ID:', resp);
      }
      else if (err) {
        console.log(err);
      }
      else {
        console.log('error with no error message');
      }
    });
  }, { noAck: false });
  // });
}).catch(err => err);



