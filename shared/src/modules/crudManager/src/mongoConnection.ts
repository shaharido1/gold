import { connect, Connection, Mongoose } from 'mongoose';
import { LogService } from '../../logHandler/logService';

export class MongoConnection {

  mongoose: Mongoose;
  logService: LogService;

  constructor(logService: LogService) {
    this.logService = logService;
  }

  connectToMongo(url): Promise<Mongoose> {
    return new Promise((resolve, reject) => {
      connect(url, { useNewUrlParser: true })
          .then((mongoose: Mongoose) => {
            this.mongoose = mongoose;
            this.mongoose.connection.on('error', (e) => {
              this.logService.error(e);
            });
            return resolve(mongoose);
          })
          .catch(err => {
            this.logService.error('fail to connect to mongoDb');
            this.logService.error(err);
            return reject(err);
          });
    });
  }

  disconnect(cb?: (error?: any) => void): Promise<void> {
    return new Promise((resolve, reject) => {

      this.mongoose.disconnect(err => {
        if (err) {
          this.logService.error(err);
          return reject(err);
        }
        else {
          return resolve();
        }
      });
    });
  }

}
