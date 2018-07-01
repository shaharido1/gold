"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("./redis");
const RSMQPromise = require("rsmq-promise");
class RedisMqAdapter extends redis_1.RedisAdapter {
    // private unDeletedMsg: Array<string> = [];
    initRMSQ() {
        return new Promise((resolve, reject) => {
            console.log('initRMSQ');
            this.initClientConnection()
                .then(client => {
                this.client = client;
                this.rsmq = new RSMQPromise({ client });
                this.assertQueue()
                    .then(() => {
                    console.log('finished assert Q');
                    console.log(this.config.config_redisQueueName);
                    return resolve();
                });
            })
                .catch(err => {
                console.log(err);
                return reject(err);
            });
        });
    }
    assertQueue(qname) {
        qname ? this.config.config_redisQueueName = qname : this.config.config_redisQueueName;
        return new Promise((reoslve, reject) => {
            this.client.exists(`rsmq:${this.config.config_redisQueueName}:Q`, (err, res) => {
                if (res >= 1) {
                    console.log(`Queue ${qname} already exist`);
                    return reoslve();
                }
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(`creating Queue ${this.config.config_redisQueueName}`);
                    this.rsmq.createQueue({ qname: this.config.config_redisQueueName })
                        .then(() => {
                        console.log('Queue created!');
                        return reoslve();
                    })
                        .catch(err => {
                        if (err) {
                            console.error(err);
                            return reject();
                        }
                    });
                }
            });
        });
    }
    sendMassage(message, numberOfRounds, totalNumberOfRounds) {
        message = JSON.stringify(message);
        const timeToWightToRedis = new Date().getTime();
        this.rsmq.sendMessage({
            qname: this.config.config_redisQueueName,
            message
        }, (err, resp) => {
            if (resp) {
                if (numberOfRounds % totalNumberOfRounds == 0) {
                    console.log(`Time to write to redis: ${(new Date().getTime() - timeToWightToRedis) * 0.001} sec\n`);
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
}
exports.RedisMqAdapter = RedisMqAdapter;
//# sourceMappingURL=redisMQ.js.map