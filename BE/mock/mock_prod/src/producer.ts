import { ProducerConfig } from './model/producer.config.interface';
import { RabbitAdapter } from '../../../shared/rabbit/rabbit';
import { MockDataGenerator } from './mockDataGeneretor/mockDataGeneretor';
import { ConfigHandler } from '../../../shared/configSetup/configHandler';
import { configFileLocation } from '../config/config.filePath';
import { levels } from '../../../shared/logHandler/modle/logerOptions';
import { LoggerHandler } from '../../../shared/logHandler/logHendler';
import { RedisAdapter } from '../../../shared/redis/redis';
import { QueueTipe } from './model/Qtypes';
import { Observable } from 'rxjs/index';

export class MockProducer {
  private config: ProducerConfig;
  private rabbitAdapter: RabbitAdapter;
  private redisAdapter: RedisAdapter;
  private loggerHandler: LoggerHandler;
  private QType: string;


  constructor(QueueType: string, timeToRepeat: number) {
    this.config = <ProducerConfig>new ConfigHandler(configFileLocation).finalConfig;
    this.queueTypeTest(QueueType);
    this.logesHandler();
    this.init(timeToRepeat);
  }

  private queueTypeTest(QueueType): void {
    if (QueueType === QueueTipe.rabbit) {
      this.QType = QueueTipe.rabbit;
      this.rabbitAdapter = new RabbitAdapter(this.config.rabbitConfig);
    }
    else if (QueueType === QueueTipe.redis) {
      this.QType = QueueTipe.redis;
      this.redisAdapter = new RedisAdapter(this.config.redisConfig);
    }
  }

  logesHandler() {
    // todo finish loggerHandler
    // const loggerSetup = { name: 'producer', path: __dirname };
    // this.loggerHandler = new LoggerHandler(loggerSetup);
    // this.loggerHandler.loggerWrite(levels.TRACE, 'producer starting to work');
  }

  public init(timeToRepeat) {
    return this.rabbitAdapter.initConnection()
  }

  generateToQueue(obs : Observable<any>) {
    obs.subscribe(data => {
      this.rabbitAdapter.sendToQueue(data);
    })
  }



}
