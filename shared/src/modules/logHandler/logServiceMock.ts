import { LogService } from './logService';

export class LogServiceMock {
      log = (log) => console.log(log);
      error = (err) => console.log(err);

      loggerWrite = (wr) => console.log(wr)
      init = () => console.log("mock init")

}