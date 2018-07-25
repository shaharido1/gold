import { CHANNEL, MockPublisher } from './redisMockPublisher/redisMockPublisher';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export class EntityService {


  pubSub;
  private mockRedis: MockPublisher;
  private redisPubSub: RedisPubSub;
  constructor(pubSub) {
    this.pubSub = pubSub;
    this.mockRedis = new MockPublisher();
    this.connectToRedis();

  }

  getAll() {
    return this.mockRedis.getFromRedis()
  }

  entitySub() {
    return this.redisPubSub.asyncIterator(CHANNEL)
  }


  connectToRedis() {
    const options = {
      host: "localhost",
      port: 6379
    };
    this.redisPubSub = new RedisPubSub({
      connection: options
    });

    this.redisPubSub.subscribe(CHANNEL, (payload) => {
      // extract message object from payload wrapper
      try {
        const message = payload[CHANNEL]; // object wrapped in channel name
      } catch (error) {
        console.error(`Error trying to extract new message from payload`);
        console.error(error.message);
      }
    });


  }

}