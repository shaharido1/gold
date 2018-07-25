"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisAdapter_1 = require("./redisAdapter");
const redisQuer_1 = require("./entity/redisQuer");
var RedisGetTypes;
(function (RedisGetTypes) {
    RedisGetTypes["set"] = "set";
    RedisGetTypes["hashMap"] = "hashMap";
})(RedisGetTypes = exports.RedisGetTypes || (exports.RedisGetTypes = {}));
var RedisAnswerTypes;
(function (RedisAnswerTypes) {
    RedisAnswerTypes["object"] = "object";
    RedisAnswerTypes["missionId"] = "missionId";
    RedisAnswerTypes["entityId"] = "entityId";
})(RedisAnswerTypes = exports.RedisAnswerTypes || (exports.RedisAnswerTypes = {}));
var GetRangeSorted;
(function (GetRangeSorted) {
    GetRangeSorted["withscores"] = "withscores";
    GetRangeSorted["limit"] = "limit";
    GetRangeSorted[GetRangeSorted["zero"] = 0] = "zero";
    GetRangeSorted[GetRangeSorted["one"] = 1] = "one";
})(GetRangeSorted = exports.GetRangeSorted || (exports.GetRangeSorted = {}));
class GoldDbService {
    constructor() {
        this.redis = new redisAdapter_1.RedisAdapter();
        this.config = this.redis.config;
        this.mapSetFields = new Map();
        this.mapSomeFields = new Map();
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
                batch.forEach((entity) => {
                    this.writeEntityToRedis(entity);
                });
                this.redis.execData()
                    .then((res) => {
                    resolve(res);
                })
                    .catch((err) => reject(err));
            }
            catch (e) {
                console.log(e);
                return reject(e);
            }
        });
    }
    writeEntityToRedis({ type, entityId, mainFieldId, entFields }) {
        const arr = GoldDbService.redisInputIntoArrayString(entFields);
        const redisKey = `${type}_${entityId}_${mainFieldId}`;
        switch (mainFieldId) {
            case redisQuer_1.RedisInterceptionCoreFields.byTime:
            case redisQuer_1.RedisInterceptionCoreFields.byRank:
            case redisQuer_1.RedisInterceptionCoreFields.dynamic: {
                this.redis.pushToSortedSet(redisKey, arr);
                break;
            }
            case redisQuer_1.RedisInterceptionCoreFields.static:
            case redisQuer_1.RedisInterceptionCoreFields.related_missions:
            case redisQuer_1.RedisInterceptionCoreFields.rank:
            case redisQuer_1.RedisInterceptionCoreFields.tags:
                this.redis.setMultiFieldsToMultival(redisKey, arr);
                break;
        }
    }
    static redisInputIntoArrayString(redisInput) {
        const redisInputArray = [];
        redisInput.forEach(input => {
            redisInputArray.push(input.subField, input.value);
        });
        return redisInputArray;
    }
    static fromRedisArrayToObject(str) {
        const objectOut = [];
        for (let x = 0; x < str.length; x += 2) {
            const tmp = {
                key: str[x],
                score: Math.round(str[x + 1] * 10) / 10
            };
            objectOut.push(tmp);
        }
        return objectOut;
    }
    redisKeyBuilder(obj) {
        Object.keys(obj).forEach(key => {
            const redisKey = obj.type + '_' + obj.entityId + '_' + key;
            switch (key) {
                case redisQuer_1.RedisInterceptionCoreFields.dynamic:
                    this.mapSetFields.set(redisKey, {
                        entityId: obj.entityId,
                        mainField: key
                    });
                    break;
                case redisQuer_1.RedisInterceptionCoreFields.static:
                    const stringFields = [];
                    Object.keys(obj[key])
                        .forEach(sub => {
                        if (obj[key][sub] === true) {
                            stringFields.push(sub);
                        }
                    });
                    this.mapSomeFields.set(redisKey, {
                        entityId: obj.entityId,
                        mainField: key,
                        subFields: stringFields
                    });
                    break;
                case redisQuer_1.RedisInterceptionCoreFields.related_missions:
                case redisQuer_1.RedisInterceptionCoreFields.rank:
                case redisQuer_1.RedisInterceptionCoreFields.tags:
                    this.mapSomeFields.set(redisKey, {
                        entityId: obj.entityId,
                        mainField: key,
                        subFields: obj.missionId,
                        missionId: obj.missionId
                    });
                    break;
            }
        });
    }
    getAllEntityData(query) {
        return new Promise((resolve, reject) => {
            this.redisKeyBuilder(query);
            const promises = [];
            promises.push(this.getAllEntitiesSubFields());
            // promises.push(this.getTopRateFieldOfSet(this.mapSetFields));
            this.redis.execData()
                .then(() => {
                Promise.all(promises).then((response) => {
                    console.log(response);
                    // const missionAnswer = this.creatObjectOfEntity(response);
                    // this.mapSomeFields = new Map();
                    // this.mapSetFields = new Map();
                    // resolve(missionAnswer);
                    resolve();
                });
            })
                .catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }
    getAllEntitiesSubFields(someFields = this.mapSomeFields) {
        const promises = [];
        someFields.forEach(({ subFields }, redisKey) => {
            promises.push(this.redis.getValue(redisKey, subFields, {
                redisKey,
                type: RedisGetTypes.hashMap
            }));
        });
        return promises;
    }
    getTopRateFieldOfSet(setFields = this.mapSetFields) {
        const promises = [];
        setFields.forEach((value, redisKey) => {
            promises.push(this.redis.getRangeSetByScoreHighToLow(redisKey, '+inf', '-inf', GetRangeSorted.withscores, GetRangeSorted.limit, GetRangeSorted.zero, GetRangeSorted.one, {
                type: RedisGetTypes.set,
                redisKey
            }));
        });
        return promises;
    }
    creatObjectOfEntity(arr) {
        const newMissionAnswer = {};
        arr.forEach((wrapper) => {
            wrapper.forEach((answer) => {
                if (answer.argsToResolve && answer.argsToResolve.type === RedisGetTypes.hashMap) {
                    const val = this.mapSomeFields.get(answer.argsToResolve.redisKey);
                    const st = {};
                    if (typeof val.subFields === RedisAnswerTypes.object) {
                        val.subFields.forEach((f, i) => {
                            st[f] = answer.response[i];
                        });
                        newMissionAnswer[val.mainField] = st;
                    }
                    else {
                        newMissionAnswer[val.mainField] = answer.response;
                        newMissionAnswer[RedisAnswerTypes.missionId] = val.missionId;
                    }
                    newMissionAnswer[RedisAnswerTypes.entityId] = val.entityId;
                }
                else if (answer.argsToResolve && answer.argsToResolve.type === RedisGetTypes.set) {
                    const val = this.mapSetFields.get(answer.argsToResolve.redisKey);
                    newMissionAnswer[val.mainField] = GoldDbService.fromRedisArrayToObject(answer.response);
                }
            });
        });
        // console.log(newMissionAnswer);
        return newMissionAnswer;
    }
    createQuery(entityId, missionId, options) {
        // todo options
        const entityQuery = {
            type: redisQuer_1.RedisDataType.interception,
            entityId: entityId.key.split('_').pop(),
            missionId: `M_${missionId}`,
            static: {
                name: true,
                surName: true,
                address: true
            },
            dynamic: true,
            rank: true,
            tags: true
        };
        return entityQuery;
    }
    getFieldsOfMission({ type, missionId, mainFieldId }, max, min) {
        return new Promise((resolve, reject) => {
            this.getMission({ type, missionId, mainFieldId }, max, min)
                .then((entityIds) => {
                this.mapSomeFields = new Map();
                this.mapSetFields = new Map();
                entityIds.forEach((entityId) => {
                    const query = this.createQuery(entityId, missionId);
                    console.log(query);
                    console.log('\n');
                    this.getAllEntityData(query);
                    // .then((entityDetails) => {
                    //   console.log(entityDetails);
                    // resolve(entityDetails);
                    // });
                });
            }).catch(err => console.log(err));
        });
    }
    getMission({ type, missionId, mainFieldId }, max, min) {
        return new Promise((resolve, reject) => {
            const redisKey = `${type}_${missionId}_${mainFieldId}`;
            this.redis.getRangeSetByScoreHighToLow(redisKey, '+inf', '-inf', GetRangeSorted.withscores, GetRangeSorted.limit, min, max)
                .then((res) => {
                const mission = GoldDbService.fromRedisArrayToObject(res);
                resolve(mission);
            });
            this.redis.execData()
                .catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }
    getTopInRangeOfScore({ type, missionId, mainFieldId }, max, min) {
        return new Promise((resolve, reject) => {
            const redisKey = `${type}_${missionId}_${mainFieldId}`;
            console.log(redisKey);
            const prom = this.redis.getRangeSetByScoreHighToLow(redisKey, '+inf', '-inf', GetRangeSorted.withscores, GetRangeSorted.limit, max, min);
            this.redis.execData()
                .then(() => {
                prom.then((res) => {
                    const stretcheredObject = GoldDbService.fromRedisArrayToObject(res);
                    resolve(stretcheredObject);
                });
            })
                .catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }
}
exports.GoldDbService = GoldDbService;
//# sourceMappingURL=goldDbService.js.map