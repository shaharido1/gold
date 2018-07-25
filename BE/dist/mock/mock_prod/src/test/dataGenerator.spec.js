"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../shared/src/modules/utils/utils");
describe('retryPromiseTest', () => {
    // let delay = false;
    // it('create config', (done) => {
    //   const config = new ConfigHandler(configFileLocation,).finalConfig;
    //   console.log(config);
    //   if (this.config) {
    //   done();
    //   }
    // });
    const resolvingPromise = () => {
        return new Promise((resolve, reject) => {
            if (delay) {
                resolve('promise resolved');
            }
            else {
                reject();
            }
        });
    };
    it('should return promise', (done) => {
        setTimeout(() => {
            delay = true;
        }, 1000);
        utils_1.retryPromise(resolvingPromise.bind(this), 500)
            .then((s) => {
            console.log('success creating connection');
            console.log(s);
            done();
        });
    });
});
//# sourceMappingURL=dataGenerator.spec.js.map