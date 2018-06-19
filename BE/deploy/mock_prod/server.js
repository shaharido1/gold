"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_1 = require("./config/appConfig");
const amqp = require('amqplib/callback_api');
const uuidv4 = require('uuid/v4');
const batchNumber = Number(appConfig_1.appConfig.batchNumber);
setTimeout(() => {
    console.log('trying to connect to ' + `amqp://guest:guest@${process.env.rabbitHost}:${process.env.rabbitPort}`);
    amqp.connect(`amqp://guest:guest@${process.env.rabbitHost}:${process.env.rabbitPort}`, (err, conn) => {
        if (conn) {
            console.log('connected to rabbitMQ');
            conn.createChannel((err, ch) => {
                const q = 'task';
                let i = 0;
                let totalLines = 0;
                ch.assertQueue(q);
                const stopFunction = setInterval(() => {
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
                    ch.sendToQueue(q, Buffer.from(`{"message":${JSON.stringify(mockData)} ,"rabbitStart":${start}}`), { persistent: true });
                    totalLines += batchNumber;
                    // console.log(`Lines ${totalLines} was send`);
                    // if (totalLines === appConfig.totalNumberOfRounds) {
                    //   clearInterval(stopFunction);
                    // }
                }, appConfig_1.appConfig.batchNumber / 10);
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
//# sourceMappingURL=server.js.map