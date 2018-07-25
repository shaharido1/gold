"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RedisQuer {
    constructor(redisQuer) {
        this.entFields = {
            static: {
                address: true,
                sureName: true,
                name: true
            },
            dynamic: undefined,
            rank: true,
            tag: true
        };
        if (redisQuer) {
            if (redisQuer.entFields) {
                this.entFields = redisQuer.entFields;
            }
            this.missionId = redisQuer.missionId;
            this.type = redisQuer.type;
            this.entityId = redisQuer.entityId;
        }
        else {
            this.generateRandom();
        }
    }
    generateRandom() {
        // this.entityId = Math.random()
    }
}
exports.RedisQuer = RedisQuer;
//# sourceMappingURL=redisQuer.class.js.map