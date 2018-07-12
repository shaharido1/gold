"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisAdapter_1 = require("./redisAdapter");
const RSMQPromise = require("rsmq-promise");
class RedisMqAdapter extends redisAdapter_1.RedisAdapter2 {
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
        if (qname !== undefined) {
            this.config.config_redisQueueName = qname;
        }
        return new Promise((resolve, reject) => {
            this.client.exists(`rsmq:${this.config.config_redisQueueName}:Q`, (err, res) => {
                if (res >= 1) {
                    console.log(`Queue ${this.config.config_redisQueueName} already exist`);
                    return resolve();
                }
                if (err) {
                    console.error(err);
                }
                else {
                    this.rsmq.createQueue({ qname: this.config.config_redisQueueName })
                        .then(() => {
                        console.log(`Queue ${this.config.config_redisQueueName} created!`);
                        return resolve();
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
    sendMassage(message, qname = this.config.config_redisQueueName) {
        console.log((qname));
        return new Promise((resolve, reject) => {
            this.rsmq.sendMessage({ qname, message: JSON.stringify(message) }, (err, res) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                else if (res) {
                    return resolve(res);
                }
                else {
                    console.log('error with no error message');
                    return reject();
                }
            });
        });
    }
}
exports.RedisMqAdapter = RedisMqAdapter;
//# sourceMappingURL=redisMQ.js.map