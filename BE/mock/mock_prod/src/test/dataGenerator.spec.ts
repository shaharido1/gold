import { expect } from 'chai';
import { retryPromise } from '../../../../shared/src/modules/utils/utils';
import { ConfigHandler } from '../../../../shared/src/modules/configSetup/configHandler';
import { configFileLocation } from '../../config/config.filePath';


describe('retryPromiseTest', () => {
  // let delay = false;

  it('create config', (done) => {
    const config = new ConfigHandler(configFileLocation, 'config_', true).finalConfig;
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
