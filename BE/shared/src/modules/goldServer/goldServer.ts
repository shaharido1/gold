import { LoggerHandler } from '../logHandler/logHendler';
import { ConfigHandler } from '../configSetup/configHandler';


export abstract class GoldServer {
  protected config;
  protected loggerHandler: LoggerHandler;


  protected constructor(str, test?: boolean) {
    this.config = new ConfigHandler(str).finalConfig;
    this.logesHandler();
  }


  logesHandler() {
    // todo finish loggerHandler
    // const loggerSetup = { name: 'producer', path: __dirname };
    // this.loggerHandler = new LoggerHandler(loggerSetup);
    // this.loggerHandler.loggerWrite(levels.TRACE, 'producer starting to work');
  }


}
