"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RedisDataParser {
    constructor() {
        this.objectCreateKeys = [];
        this.objectCreateValues = [];
    }
    argsToResolveList(argsToResolve) {
        console.log(argsToResolve.length);
        if (argsToResolve.length === 2) {
            console.log(argsToResolve[0]);
            console.log(argsToResolve[1]);
        }
        // argsToResolve.forEach((key) => {
        //   if (typeof key == 'string') {
        //     const x = key.split('_').pop();
        //     // console.log(x);
        //     isNaN(parseInt(x)) ? this.objectCreateKeys.push(x) : this.objectCreateKeys.push('M_' + x);
        //   }
        //   else {
        //     console.log(key);
        //   }
        // console.log('\n');
        // });
    }
    responseList(response) {
        console.log(response);
        this.objectCreateValues.push(response);
    }
    missionParser(arr) {
        const newMissionAnswer = {};
        // console.log(...arr);
        arr.forEach(answer => {
            // console.log(answer);
            answer.forEach(t => {
                if (t.argsToResolve.redisKey !== undefined) {
                    if (typeof t.argsToResolve.subField === 'object') {
                        const st = {};
                        t.argsToResolve.subField.forEach((f, i) => {
                            st[f] = t.response[i];
                        });
                        const staticKey = t.argsToResolve.redisKey.split('_').pop();
                        newMissionAnswer[staticKey] = st;
                    }
                    else {
                        // console.log(t.argsToResolve.redisKey);
                        const key = t.argsToResolve.redisKey.split('_').pop();
                        newMissionAnswer[key] = t.response;
                    }
                }
                else {
                    answer.forEach((tt) => {
                        const key = tt.argsToResolve[0].split('_').pop();
                        newMissionAnswer[key] = tt.response;
                    });
                }
            });
        });
        console.log(newMissionAnswer);
    }
    filterDouble(array) {
        return array.filter((item, pos, self) => {
            return self.indexOf(item) == pos;
        });
    }
}
exports.RedisDataParser = RedisDataParser;
//# sourceMappingURL=redisDataParser.js.map