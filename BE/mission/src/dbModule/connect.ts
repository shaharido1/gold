
const mongoose = require('mongoose');

export class DBManager {
  static connect(url, logService) {

    return new Promise((resolve, reject) => {
      mongoose.connect(url);
      const db = mongoose.connection;
      db.on('error', (e) => {
        logService.error(e);
        return reject(e);
      });
      db.once('open', function () {
        console.log('connected to mongo!');
        return resolve();
      });
    });
  }

  static disconnect(done?) {
    mongoose.disconnect(done);
  }
}
