"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
class RedisAdapter {
    initClientConnection(redisEnv) {
        return new Promise((resolve, reject) => {
            const tryToConnect = setInterval(() => {
                this.redisConnect(redisEnv)
                    .then(() => {
                    clearInterval(tryToConnect);
                    this.multi = this.client.multi();
                    console.log('redis Created');
                    return resolve(this.client);
                })
                    .catch(err => err);
            }, 2000);
        });
    }
    redisConnect(redisEnv) {
        return new Promise((resolve, reject) => {
            this.client = redis_1.default.createClient({ host: redisEnv });
            // this.client = redis.createClient({ host: 'redis' });
            this.client.on('ready', () => {
                return resolve();
            });
            this.client.on('error', (err) => {
                console.log(err);
                return reject();
            });
        });
    }
    saveInRedis(list, key) {
        return new Promise((resolve, reject) => {
            list.forEach(data => {
                // console.log(typeof data.id);
                this.multi.hmset(`${key}:${data.id.toString()}`, 'massage', JSON.stringify(data), (err, res) => {
                    // console.log('redis:' + res);
                    if (err) {
                        console.error(err);
                    }
                });
            });
            this.multi.exec((err, replies) => {
                if (replies) {
                    return resolve(replies);
                }
                err ? console.log(err) : console.log('error with no error message');
                return reject(err);
            });
        });
    }
}
exports.RedisAdapter = RedisAdapter;
//# sourceMappingURL=redis.js.map