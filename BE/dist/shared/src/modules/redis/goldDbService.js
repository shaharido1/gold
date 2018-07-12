"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisAdapter_1 = require("./redisAdapter");
class GoldDbService {
    constructor() {
        this.redis = new redisAdapter_1.RedisAdapter();
        this.config = this.redis.config;
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
                    .then((res) => resolve(res))
                    .catch(() => reject());
            }
            catch (e) {
                console.log(e);
                return reject(e);
            }
        });
    }
    writeEntityToRedis({ type, entityId, mainField, redisInput }) {
        const redisKey = mainField ? `${type}_${entityId}_${mainField}` : `${type}_${entityId}`;
        return this.redis.setMultiFieldsToMultival(redisKey, GoldDbService.redisInputIntoArrayString(redisInput));
    }
    static redisInputIntoArrayString(redisInput) {
        const redisInputArray = [];
        redisInput.forEach(input => {
            redisInputArray.push(input.subField, input.value);
        });
        return redisInputArray;
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
exports.GoldDbService = GoldDbService;
//# sourceMappingURL=goldDbService.js.map