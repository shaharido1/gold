"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_1 = require("./config/appConfig");
const redis_1 = require("../../shared/redis/redis");
const rsmq_worker_1 = __importDefault(require("rsmq-worker"));
const redisQueueName = process.env.redisQueueName || 'task2';
const redisEnv = process.env.redisEnv || 'localhost';
const worker = new rsmq_worker_1.default(redisQueueName, { host: redisEnv, interval: 0 });
const redis = new redis_1.RedisAdapter();
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
            if (numberOfRounds % appConfig_1.appConfig.totalNumberOfRounds == 0) {
                console.log(`\n********************************************`);
                console.log(`Average time for this round: ${roundTime / appConfig_1.appConfig.totalNumberOfRounds}`);
                // console.log(`Finished ${numberOfRounds} number of rounds`);
                console.log(`avg time: ${(avgTime / numberOfRounds)} sec`);
                console.log(`Total entities : ${numberOfRounds * appConfig_1.appConfig.batchNumber}`);
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
//# sourceMappingURL=server.js.map