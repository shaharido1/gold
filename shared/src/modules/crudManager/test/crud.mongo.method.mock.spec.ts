import { DockerAdapter } from '../../dockerode/dockerAdapter';
import { assert } from 'chai';
import { MongoConnection } from '../src/mongoConnection';
import { LogServiceMock } from '../../logHandler/logServiceMock';


describe('crud method on mongo', () => {
  const dockerAdapter = new DockerAdapter();
  let mongoContainer;
  it('should create mongoDb container', () => {
    return dockerAdapter.startContainer('mongo', '27017')
        .then(container => {})
        .catch((err) => {
          console.log(err);
          assert.isNotOk('couldnt create container');
        });
  });

  it('should connect to mongo container', () => {
    const mockLogger = new LogServiceMock();
    const mongoConnection = new MongoConnection(mockLogger);
    const mongoUrl = 'mongodb://localhost:27017/test';
    return mongoConnection.connectToMongo(mongoUrl);
  });


});