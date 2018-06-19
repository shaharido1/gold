"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("./redis");
const rsmq_promise_1 = __importDefault(require("rsmq-promise"));
class RedisMqAdapter extends redis_1.RedisAdapter {
    constructor() {
        super(...arguments);
        this.unDeletedMsg = [];
    }
    initRMSQ(qname, redisEnv) {
        return new Promise((resolve, reject) => {
            this.initClientConnection(redisEnv)
                .then(client => {
                this.client = client;
                this.rsmq = new rsmq_promise_1.default({ client });
                this.assertQueue(qname)
                    .then(() => {
                    console.log('finished assert Q');
                    this.qname = qname;
                    return resolve(this.rsmq);
                });
            })
                .catch(err => {
                console.log(err);
                return reject(err);
            });
        });
    }
    assertQueue(qname) {
        return new Promise((reoslve, reject) => {
            this.client.exists(`rsmq:${qname}:Q`, (err, res) => {
                if (res >= 1) {
                    console.log(`Queue ${qname} already exist`);
                    return reoslve();
                }
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(`creating Queue ${qname}`);
                    this.rsmq.createQueue({ qname: qname })
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
    reciveMessageNDo(workToDo) {
        this.rsmq.receiveMessage({ qname: this.qname }).then((message) => {
            if (message && Object.keys(message).length) {
                workToDo(message).then(message => {
                    this.rsmq.deleteMessage({ qname: this.qname, id: message.id }, (err, resp) => {
                        if (resp === 1) {
                            this.reciveMessageNDo(workToDo);
                        }
                        else {
                            this.unDeletedMsg.push(message.id);
                        }
                    });
                });
            }
            else {
                console.log('no message');
                setTimeout(() => {
                    this.reciveMessageNDo(workToDo);
                }, 200);
            }
        });
    }
}
exports.RedisMqAdapter = RedisMqAdapter;
//# sourceMappingURL=redisMQ.js.map