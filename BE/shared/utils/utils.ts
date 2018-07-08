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