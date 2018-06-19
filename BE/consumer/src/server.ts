import { appConfig } from './config/appConfig';

import { Rabbit } from '../../shared/rabbit';
import { Channel } from 'amqplib/callback_api';
import { Client, RedisSMQ } from 'rsmq';
import RSMQPromise from 'rsmq-promise';
import { RedisMqAdapter } from '../../shared/redis/redisMQ';


const reabbitQueueName = process.env.rabbitQueueName || 'task';
const redisQueueName = process.env.redisQueueName || 'task2';
const redisEnv = process.env.redisEnv || 'localhost';

const rabbit = new Rabbit();
const redis = new RedisMqAdapter();

let avgTime = 0;
let numberOfRounds = 0;
let roundTime = 0;
let toatalTime = 0;
Promise.all([redis.initRMSQ(redisQueueName, redisEnv), rabbit.initConnection(reabbitQueueName)]).then(connections => {

  const rsmq: RSMQPromise = connections[0];
  const rabbitChannel: Channel = connections[1].channel;
  const rabbitStartTime = new Date().getTime();

  rabbitChannel.consume(reabbitQueueName, data => {

    const rabbitEnd = new Date().getTime();
    const rawData = data.content.toString();
    const parsedData = JSON.parse(rawData);
    if (rabbitStartTime > parsedData.start) {
      console.log('pass');
    }
    else {
      const timeSec = (rabbitEnd - parsedData.rabbitStart) * 0.001;
      numberOfRounds++;
      avgTime += timeSec;
      // console.log(`batch ${numberOfRounds} time: ${(timeSec)} sec`);
      roundTime += timeSec;

      if (numberOfRounds % appConfig.totalNumberOfRounds == 0) {
        toatalTime += roundTime / appConfig.totalNumberOfRounds;
        console.log(`\n********************************************`);
        console.log(`Average time for this round: ${roundTime / appConfig.totalNumberOfRounds}`);
        console.log(`Finished ${numberOfRounds} number of rounds`);
        console.log(`avg time: ${(avgTime / numberOfRounds)} sec`);
        console.log(`Total entities : ${numberOfRounds * appConfig.batchNumber }`);
        console.log(`********************************************\n`);
        roundTime = 0;

      }
      // redis.saveInRedis(parsedData.message, appConfig.keyId)

      const timeTowightToRedis = new Date().getTime();
      rsmq.sendMessage({
        qname: redisQueueName,
        message: `{"message":${JSON.stringify(parsedData.message)} ,"start":${ new Date().getTime()}}`
      }, (err, resp) => {
        if (resp) {
          if (numberOfRounds % appConfig.totalNumberOfRounds == 0) {
            console.log(`Time to write to redis: ${(new Date().getTime() - timeTowightToRedis) * 0.001} sec\n`);
            // console.log('Message sent. ID:', resp);
          }
        }
        else if (err) {
          console.log(err);
        }
        else {
          console.log('error with no error message');
        }
      });

    }
    // console.log('trying to connect to ' + `amqp://guest:guest@${process.env.rabbitHost}:${process.env.rabbitPort}`);
    // rabbitChannel3.connect(`amqp://guest:guest@${process.env.rabbitHost}:${process.env.rabbitPort}`, (err, conn) => {
    //   if (conn) {
    //     console.log(`connected to ${reabbitQueueName3} queue`);
    //     conn.createChannel((err, ch) => {
    //       const q = reabbitQueueName3;
    //
    //       ch.assertQueue(reabbitQueueName3);
    //       const start = new Date().getTime();
    //       ch.sendToQueue(q, Buffer.from(`{"message":${JSON.stringify(parsedData.message)} ,"rabbitStart":${start}}`), { persistent: true });
    //     });
    //   }
    //   else {
    //     if (err) {
    //       console.log('fail to connect');
    //       console.log(err);
    //     }
    //   }
    // });

  }, { noAck: true });
  // });
}).catch(err => err);



