"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisAdapter_1 = require("./redisAdapter");
class GoldDbServise {
    constructor() {
        this.config = this.redis.config;
        this.redis = new redisAdapter_1.RedisAdapter();
    }
    connectToDataBase() {
        return new Promise((resolve, reject) => {
            this.redis.initClientConnection()
                .then(() => {
                resolve('redis is ready');
            })
                .catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }
    writeBatchToRedis(batch) {
        return new Promise((resolve, reject) => {
            try {
                batch.forEach(entity => this.writeEntityToRedis(entity)
                    .catch(err => {
                    console.log('err');
                }));
                this.redis.execData()
                    .then(() => resolve())
                    .catch(() => reject());
            }
            catch (e) {
                console.log(e);
                return reject(e);
            }
        });
    }
    writeEntityToRedis({ type, key, field, value, fieldNValueArr, subKey }) {
        return new Promise((resolve, reject) => {
            const redisKey = subKey ? `${type}_${key}_${subKey}` : `${type}_${key}`;
            const fieldNValueToSpread = fieldNValueArr || [field, value];
            this.redis.setMultiFieldsToMultival(redisKey, fieldNValueToSpread)
                .then(() => resolve())
                .catch(() => reject());
        });
    }
    getAllEntityData(redisInterceptionQuery) {
        // this.getAllEntityFields(redisInterceptionQuery);
        // this.getAllEntitySubfields(redisInterceptionQuery);
    }
    getAllEntityFields({ type, entityId, coreFields }) {
        coreFields.forEach(field => {
            const redisKey = `${type}_${entityId}_${field}`;
            return this.redis.getAllFieldsAndValues(redisKey);
        });
    }
    getAllEntitySubfields({ type, entityId, subField, missionRelatedFields }) {
        missionRelatedFields.forEach(field => {
            const redisKey = `${type}_${entityId}_${field}`;
            this.redis.getValue(redisKey, subField);
        });
    }
    getAllSubKeys(key) {
        return new Promise((resolve, reject) => {
            this.redis.getAllFields(key)
                .then(() => {
            });
        });
    }
}
exports.GoldDbServise = GoldDbServise;
//# sourceMappingURL=goldDbServise.js.map