"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configHandler_1 = require("../../../../shared/src/modules/configSetup/configHandler");
const config_filePath_1 = require("../../config/config.filePath");
describe('retryPromiseTest', () => {
    // let delay = false;
    it('create config', (done) => {
        const config = new configHandler_1.ConfigHandler(config_filePath_1.configFileLocation, 'config_', true).finalConfig;
        console.log(config);
        // if (this.config) {
        done();
        // }
    });
    // const resolvingPromise = () => {
    //   return new Promise((resolve, reject) => {
    //     if (delay) {
    //       resolve('promise resolved');
    //     }
    //     else {
    //       reject();
    //     }
    //   });
    // };
    // it('should return promise', (done) => {
    //   setTimeout(() => {
    //     delay = true;
    //   }, 1000);
    //   retryPromise(resolvingPromise.bind(this), 500)
    //       .then(
    //           (s) => {
    //             console.log('success creating connection');
    //             console.log(s);
    //             done();
    //           });
    // });
});
//# sourceMappingURL=dataGenerator.spec.js.map