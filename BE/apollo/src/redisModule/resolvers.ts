import Config from '../config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { CHANNEL, MockPublisher } from './redis.publisher';

const Redis = require('redis');
const mockPublisher = new MockPublisher();
// Instantiate Redis clients
const options = {
  host: Config.redisHost,
  port: 6379,
  retry_strategy: options => {
    // reconnect after
    return Math.max(options.attempt * 100, 3000);
  }
};

// Instantiate Redis PubSub
const pubsub = new RedisPubSub({
  connection: options
});

// Test in-memory database (you would use some real DB in production)
let nextMessageId = 1;
const messages = [];

// Update 'database' on new messages (not just on mutations)
// This allows us to update db when messages come into Redis from elsewhere
// pubsub.subscribe(CHANNEL, (payload) => {
//   console.log(`New message received on channel ${CHANNEL}`);
//
//   // extract message object from payload wrapper
//   try {
//     const message = payload[CHANNEL]; // object wrapped in channel name
//     messages.push(message); // store in in-memory 'database' above
//     console.log(`Added message to database`);
//   } catch (error) {
//     console.error(`Error trying to extract new message from payload`);
//     console.error(error.message);
//   }
// });

// Resolver


const resolvers = {
  Query: {
    messages(root, {}, context) {
      return this.mockPublisher.dataBase;
    }
  },
  Mutation: {
    addMessage: (root, { message }) => {
      console.log({ message });
      const newMessage = { id: String(nextMessageId++), content: message };
      pubsub.publish(CHANNEL, { messageAdded: newMessage });
      return messages;
    }
  },
  Subscription: {

    messageAdded: {
      resolve: (payload) => {
        console.log(payload.position,payload.rank,payload.category)
        return {
          id: payload.id,
          message: payload.message,
          position: payload.position,
          rank: payload.rank,
          category: payload.category
        }
        // return {
        //   id: 'sdf',
        //   content: 'SDf'
        // };
      },
      subscribe: () => pubsub.asyncIterator(CHANNEL)
    }
  }
};

export default resolvers;
