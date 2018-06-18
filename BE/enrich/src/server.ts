import { appConfig } from './config/appConfig';
import { RedisAdapter } from '../../shared/redis/redis';
import RSMQWorker from 'rsmq-worker';

const redisQueueName = process.env.redisQueueName || 'task2';
const redisEnv = process.env.redisEnv || 'localhost';
const worker = new RSMQWorker(redisQueueName, { host: redisEnv, interval: 0 });
const redis = new RedisAdapter();

let avgTime = 0;
let numberOfRounds = 0;
let roundTime = 0;


redis.initClientConnection(redisEnv)
    .then((client) => {

      const radisStartTime = new Date().getTime();
      console.log('enriching...');

      worker.on('message', (msg, next, id) => {
        const end = new Date().getTime();
        const parsedData = (JSON.parse(msg));
        // console.log(`${numberOfRounds} number of rounds`);

        if (radisStartTime > parsedData.start) {
          // console.log('pass');
          next();
        }
        else {
          const timeSec = (end - parsedData.start) * 0.001;
          numberOfRounds++;
          avgTime += timeSec;
          // console.log(`batch ${numberOfRounds} time: ${(timeSec)} sec`);
          roundTime += timeSec;

          if (numberOfRounds % appConfig.totalNumberOfRounds == 0) {
            console.log(`\n********************************************`);
            console.log(`Average time for this round: ${roundTime / appConfig.totalNumberOfRounds}`);
            // console.log(`Finished ${numberOfRounds} number of rounds`);
            console.log(`avg time: ${(avgTime / numberOfRounds)} sec`);
            console.log(`Total entities : ${numberOfRounds * appConfig.batchNumber }`);
            console.log(`********************************************\n`);
            roundTime = 0;

          }

          // const newList = createList(parsedData.message);
          // redis.saveInRedis(newList, appConfig.keyId).then(() => {
          worker.del(id);
          next();
          // });
        }
      });
      worker.start();
    });

// function createList(msg): Array<any> {
//   const data = msg;
//   const newList = [];
//   data.forEach(x => {
//     const newData = { ...x, status: 12 };
//     newList.push(newData);
//   });
//   return newList;
// }

// }, 3000);

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

