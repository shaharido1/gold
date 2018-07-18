import * as bunyan from 'bunyan';
import { LoggerOptions, LogLevelString } from 'bunyan';
import { levels, MyLoggerOptions } from './modle/logerOptions';
import { LogToBunyan } from './log_to_bunyan';
import * as elasticsearch from 'elasticsearch';

export class LogService {

  log: any = (log) => console.log(log);
  error: any = (err) => console.log(err);

  constructor(setup: MyLoggerOptions) {
    this.init(setup);
  }

  private init(setup) {
    const loggerSetup = {
      name: setup.name,
      // level: "trace",
      streams: [{
        type: 'rotating-file',
        level: 0,
        path: `${setup.path}/logs.json`
      }
      ]
    };
    this.log = bunyan.createLogger(loggerSetup);
    const client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: [
        {
          path: `${setup.path}/logs.json`,
          level: 'trace'
        }
      ]
    });
  }

  public loggerWrite(level: levels, msg: string) {
    console.log(`level: ${level}`);
    switch (level) {
      case levels.TRACE:
        console.log('TRACE');
        this.log.trace(msg);
        break;
      case levels.DEBUG:
        this.log.debug(msg);
        break;
      case levels.WARN:
        this.log.warn(msg);
        break;
      case levels.ERROR:
        this.log.error(msg);
        break;
      case levels.FATAL:
        this.log.fatal(msg);
        break;
      default:
        this.log.info(msg);
    }
  }

}


