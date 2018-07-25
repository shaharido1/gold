// import 'mocha';
// import { wrapCbInPromise } from './utils';

describe('check promise wrapper function', () => {
  const funcWithCallBack = (arg1, arg2, arg3, cb) => {
    setTimeout(() => {
      if (arg1 === true) {

        cb('error', null);
      }
      else {
        cb(null, 'response');
      }
    }, 500);
  };

  const logService = {
    error: (err) => console.log(err),
    info: (info) => console.log(info)
  };

  it('check promise wrapper function', (done) => {
    let str: string = "sd"
    done()
    // wrapCbInPromise(funcWithCallBack, [true, false, false], logService, null, 'test response ok - success', 'test response error - success').then((res) => {
    //   console.log('response from promise');
    //   done();
    // });

  });
});