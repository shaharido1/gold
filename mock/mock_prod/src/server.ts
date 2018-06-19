import { appConfig } from './config/appConfig';
// import { ConfigFetch } from '../../../BE/shared/configFetch';
// import { Address } from '../../../BE/shared/interfaces/path';


const amqp = require('amqplib/callback_api');
const uuidv4 = require('uuid/v4');


// const config = new ConfigFetch(appConfig, 'prod').then(
//     config.init();
// )


// const batchNumber = Number(config.finalConfig.batchNumber);
// const rabbitHost = config.finalConfig.rabbitHost;
// const rabbitPort = config.finalConfig.rabbitPort;
// const MockQueueName = config.finalConfig.MockQueueName;

const batchNumber = Number(appConfig.batchNumber);
const rabbitHost = appConfig.rabbitHost;
const rabbitPort = appConfig.rabbitPort;
const MockQueueName = appConfig.MockQueueName || 'task';

setTimeout(() => {
  console.log('trying to connect to ' + `amqp://guest:guest@${rabbitHost}:${rabbitPort}`);
  amqp.connect(`amqp://guest:guest@${rabbitHost}:${rabbitPort}`, (err, conn) => {
    if (conn) {
      console.log(' Mock_prod connected to rabbitMQ');
      conn.createChannel((err, ch) => {
        let i = 0;

        ch.assertQueue(MockQueueName);
        setInterval(() => {
          const mockData = [];
          while (i < batchNumber) {
            const id = uuidv4();
            const msg = { massage: `ms-${i}`, id: `${id}` };
            mockData.push(msg);
            i++;
          }
          i = 0;
          // console.log(mockData);
          const start = new Date().getTime();
          ch.sendToQueue(MockQueueName, Buffer.from(`{"message":${JSON.stringify(mockData)} ,"rabbitStart":${start}}`), { persistent: true });

        }, appConfig.batchNumber / 10);
      });
    }
    else {
      if (err) {
        console.log('fail to connect');
        console.log(err);
      }
    }
  });
}, 16000);

