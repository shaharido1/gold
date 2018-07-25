import { expect } from 'chai';
import { RedisAdapter } from '../src/redisAdapter';
import { DockerAdapter } from '../../dockerode/dockerAdapter';


let redis: RedisAdapter;
// let redisDocker: DockerAdapter;
const redisKey = 'key1234';
const contaioneName = 'redis_be_1';
const nultiFieldsToMultival = ['subKey1', 'subVal1', 'subKey2', 'subVal2', 'subKey3', 'subVal3', 'subKey4', 'subVal4', 'subKey5', 'subVal5'];


xdescribe('Redis Adapter test', () => {
  before('create class', () => {
    redis = new RedisAdapter();
  });

  // todo reconnection.
  // todo test big data of 1000 fields.
  // todo multi exec.


  it('redis connection', (done) => {
    redis.initClientConnection()
        .then((client) => {
          console.log(`redis con`);
          expect(client.connected).is.true;
          done();
        });
  });

  // it('reconnection to redis', (done) => {
  //
  // });

  it('write to redis ', (done) => {
    redis.setMultiFieldsToMultival(redisKey, nultiFieldsToMultival);
    redis.execData()
        .then((res) => {
          expect(res.every(member => member === 'OK')).is.true;
          done();
        })
        .catch(e => {
          console.log(e);
        });
  });

  it('Read all fields and values', (done) => {
    redis.getAllFieldsAndValues(redisKey);
    redis.execData()
        .then((res) => {
          expect(res).to.be.an('array').not.empty;
          done();
        })
        .catch(e => {
          console.log(e);
        });
  });
  it('Read val of hash map', (done) => {
    const subFilds = 'subKey2';
    redis.getValue(redisKey, [subFilds]);
    redis.execData()
        .then((res) => {
          expect(res).to.be.an('array').not.empty;
          done();
        })
        .catch(e => {
          console.log(e);
        });
  });

  it('Read all fields in hash', (done) => {
    redis.getAllFieldsHash('M_12541');
    redis.execData()
        .then((res) => {
          console.log(res);
          expect(res).to.be.an('array').not.empty;
          done();
        })
        .catch(e => {
          console.log(e);
        });
  });


});
