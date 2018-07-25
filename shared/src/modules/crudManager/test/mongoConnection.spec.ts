import { MongoConnection } from '../src/mongoConnection';
import { LogServiceMock } from '../../logHandler/logServiceMock';
import {assert} from 'chai';


xdescribe('assert monogo connection', () => {
  const mockLogger = new LogServiceMock();
  const mongoConnection = new MongoConnection(mockLogger);
  const mongoUrl = 'mongodb://localhost:27017/test';
  it('should connect to mongodb', () => {
    return mongoConnection.connectToMongo(mongoUrl);
  });

  it('should fail to connect to mongodb', (done) => {
    const badUrl = "mongodb://loclshmost:27017/test";
    mongoConnection.connectToMongo(badUrl)
        .then(() => {assert.isNotOk('should not connect on bad url'); done();})
        .catch(() => done())

  });

  after(mongoConnection.disconnect)


});