export function retryPromise(promise: () => Promise<any>, timeout = 5000, maxTry?): Promise<any> {
  return new Promise((resolve, reject) => {
    let i = 0;
    const interval = setInterval(() => {
      promise()
          .then((result) => {
            clearInterval(interval);
            return resolve(result);
          })
          .catch((err) => {
            if (maxTry && i >= maxTry) {
              return reject('failed for' + maxTry + 'times');
            }
            else {
              console.log('failed for the ' + i++ + 'time, due to ' + err);
            }
          });
    }, timeout);
  });
}


export function callBackIntoPromise(err, res, resolve, reject, logService, returnObjField?, resolveLog?, errorLog?) {
  if (err) {
    errorLog ? logService.error(errorLog) : null;
    logService.error(err);
    return reject(err);
  }
  else if (res) {
    resolveLog ? logService.log(resolveLog) : null;
    return resolve(returnObjField ? res[returnObjField] : res);
  }
  else {
    logService.info('return void');
    return resolve();
  }

}

export function wrapCbInPromise(func, args, logService, returnObjField?, resolveLog?, errorLog?) {
  return new Promise((resolve, reject) =>
      wrapInTryCatch(func, args, logService, reject, (err, res) =>
          callBackIntoPromise(err, res, resolve, reject, logService, returnObjField, resolveLog, errorLog)
      ));
}


export function wrapInTryCatch(func, args, logService, reject?, cb?) {
  try {
    func(...args, cb);
  }
  catch (e) {
    logService.error(e);
    return reject ? reject(e) : null;
  }
}