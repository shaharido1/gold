import { appConfig } from './config/appConfig';
import RedisSMQ, { Client } from 'rsmq';
import { RedisAdapter } from '../../shared/redis/redis';
import RSMQWorker from 'rsmq-worker';

const redisQueueName = process.env.redisQueueName || 'task2';
const worker = new RSMQWorker(redisQueueName);
const redis = new RedisAdapter();


redis.initClientConnection()
    .then((client) => {
      const radisStartTime = new Date().getTime();
      let avgTime = 0;
      let numberOfMsg = 0;

      worker.on('message', (msg, next, id) => {
        const end = new Date().getTime();
        const parsedData = (JSON.parse(msg));
        if (radisStartTime > parsedData.start) {
          next();
        }
        else {
          const timeSec = (end - parsedData.start) / 1000;
          numberOfMsg++;
          avgTime += timeSec;
          console.log(`batch ${numberOfMsg} time: ${(timeSec)} sec`);
          console.log(`avg time: ${(avgTime / numberOfMsg)} sec`);
          const newList = createList(parsedData.message);
          redis.saveInRedis(newList, appConfig.keyId).then(() => {
            worker.del(id);
            next();
          });
        }
      });
      worker.start();
    });

function createList(msg): Array<any> {
  const data = msg;
  const newList = [];
  data.forEach(x => {
    const newData = { ...x, status: 12 };
    newList.push(newData);
  });
  return newList;
}

// (function Worker(redisQueueName) {
//
//   worker.on('message', (msg, next, id) => {
//     console.log('Message id : ' + id);
//     // console.log(msg);
//     const data = JSON.parse(msg);
//     const newList = [];
//     data.forEach(x => {
//       const newData = { ...x, status: 12 };
//       newList.push(newData);
//     });
//     // console.log(newList);
//     redis.saveInRedis(newList, appConfig.keyId);
//     next();
//   });
//   worker.start();
// })();

// redis.initRMSQ(redisQueueName).then(rsmq => {
// redis.reciveMessageNDo((message) => {
//       return new Promise((resolve, reject) => {
//           console.log(message);
//         return resolve(message);
//         // const newList = [];
//         // const list = JSON.parse(message.message);
//         // list.forEach((x) => {
//         //   const newData = {...x , status: 12};
//         //   newList.push(newData);
//         // });
//         // console.log(newList);
//         // redis.saveInRedis(newList, appConfig.keyId);
//
//       });
//     });
// });
// getNwork(workMessage);

