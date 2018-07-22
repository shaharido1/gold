import * as bunyan from 'bunyan';

export class LogToBunyan {

  error;
  info;
  warning;
  debug;
  trace;

  create(config) {
    // config is the object passed to the client constructor.
     const bun = bunyan.createLogger({ name: 'mylogger' });
     this.error = bun.error.bind(bun);
     this.warning = bun.warn.bind(bun);
     this.info = bun.info.bind(bun);
     this.debug = bun.debug.bind(bun);
     this.trace = function (method, requestUrl, body, responseBody, responseStatus) {
      bun.trace({
        method,
        requestUrl,
        body,
        responseBody,
        responseStatus
      });
    };
   }

}
