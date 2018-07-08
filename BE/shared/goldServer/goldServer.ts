import { ProducerConfig } from '../../mock/mock_prod/src/model/producer.config.interface';
import { LoggerHandler } from '../logHandler/logHendler';
import { ConfigHandler } from '../configSetup/configHandler';


export abstract class GoldServer {
  protected config;
  protected loggerHandler: LoggerHandler;


  constructor(str) {
    this.config = <ProducerConfig>new ConfigHandler(str).finalConfig;
    this.logesHandler();
  }


  logesHandler() {
    // todo finish loggerHandler
    // const loggerSetup = { name: 'producer', path: __dirname };
    // this.loggerHandler = new LoggerHandler(loggerSetup);
    // this.loggerHandler.loggerWrite(levels.TRACE, 'producer starting to work');
  }


}
