import RSMQWorker from 'rsmq-worker';
import { RedisAdapter } from '../../shared/redis/redis';
import { ConfigHandler } from '../../shared/configServer/configHandler';


const path = './src/config/config.json';

const configHandler = new ConfigHandler();
const config = configHandler.getConfig(path);
const redis = new RedisAdapter();

const redisQueueName = config.config_redisQueueName;
const redisHost = config.config_redisHost;
const batchNumber = config.config_batchNumber;
const totalNumberOfRounds = config.config_totalNumberOfRounds;
const keyId = config.config_keyId;

const worker = new RSMQWorker(redisQueueName, { host: redisHost, interval: 0 });

let avgTime = 0;
let numberOfRounds = 0;
let roundTime = 0;

redis.initClientConnection(redisHost)
    .then(() => {

      const radisStartTime = new Date().getTime();
      console.log('enrich started');

      worker.on('message', (msg, next, id) => {
        const end = new Date().getTime();
        const parsedData = (JSON.parse(msg));

        if (radisStartTime > parsedData.start) {
          // console.log('pass');
          next();
        }
        else {
          const timeSec = (end - parsedData.start) * 0.001;
          numberOfRounds++;
          avgTime += timeSec;
          roundTime += timeSec;

          if (numberOfRounds % totalNumberOfRounds == 0) {
            console.log(`\n********************************************`);
            console.log(`Average time for this round: ${roundTime / totalNumberOfRounds}`);
            // console.log(`Finished ${numberOfRounds} number of rounds`);
            console.log(`avg time: ${(avgTime / numberOfRounds)} sec`);
            console.log(`Total entities : ${numberOfRounds * batchNumber }`);
            console.log(`********************************************\n`);
            roundTime = 0;

          }

          // const newList = createList(parsedData.message);
          // redis.saveInRedis(newList, keyId).then(() => {
          worker.del(id);
          // next();
          // });
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


