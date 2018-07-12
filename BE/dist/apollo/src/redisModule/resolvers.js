"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const Redis = require('ioredis');
// Instantiate Redis clients
const options = {
    host: config_1.default.redisHost,
    port: 6379,
    retry_strategy: options => {
        // reconnect after
        return Math.max(options.attempt * 100, 3000);
    }
};
// Instantiate Redis PubSub
const pubsub = new graphql_redis_subscriptions_1.RedisPubSub({
    connection: options
});
// Test in-memory database (you would use some real DB in production)
let nextMessageId = 1;
const messages = [];
const CHANNEL = `messageAdded`;
// Update 'database' on new messages (not just on mutations)
// This allows us to update db when messages come into Redis from elsewhere
pubsub.subscribe(CHANNEL, (payload) => {
    console.log(`New message received on channel ${CHANNEL}`);
    // extract message object from payload wrapper
    try {
        const message = payload[CHANNEL]; // object wrapped in channel name
        messages.push(message); // store in in-memory 'database' above
        console.log(`Added message to database`);
    }
    catch (error) {
        console.error(`Error trying to extract new message from payload`);
        console.error(error.message);
    }
});
// Resolver
const resolvers = {
    Query: {
        messages(root, {}, context) {
            return messages;
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
            // resolve: (payload) => {
            //   console.log(payload);
            //   return "pa"
            //   // return {
            //   //   id: 'sdf',
            //   //   content: 'SDf'
            //   // };
            // },
            subscribe: () => pubsub.asyncIterator(CHANNEL)
        }
    }
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map