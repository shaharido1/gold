import { PubSub } from 'graphql-subscriptions';
import { withFilter } from 'graphql-subscriptions';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const channels = [{
  id: '1',
  name: 'soccer',
  messages: [{
    id: '1',
    text: 'soccer is football',
  }, {
    id: '2',
    text: 'hello soccer world cup',
  }]
}, {
  id: '2',
  name: 'baseball',
  messages: [{
    id: '3',
    text: 'baseball is life',
  }, {
    id: '4',
    text: 'hello baseball world series',
  }]
}];
let nextId = 3;
let nextMessageId = 5;
const options = {
  host: 'localhost',
  port: 6379,
  retry_strategy: options => {
    // reconnect after
    return Math.max(options.attempt * 100, 3000);
  },
  connectionListener: (err =>console.log(err))
};

// Instantiate Redis PubSub
const pubsub = new RedisPubSub({
  connection: options
});

const CHANNEL = `messageAdded`;
const CHANNEL1 = `messageAdded1`;
pubsub.subscribe(CHANNEL, (payload) => {
  pubsub.publish(CHANNEL1, {payload})
  console.log(payload)
})
console.log("here")




export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
    channel: (root, { id }) => {
      return channels.find(channel => channel.id === id);
    },
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: String(nextId++), messages: [], name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
    addMessage: (root, { message }) => {
      const channel = channels.find(channel => channel.id === message.channelId);
      if(!channel)
        throw new Error("Channel does not exist");

      const newMessage = { id: String(nextMessageId++), text: message.text };
      channel.messages.push(newMessage);

      pubsub.publish(CHANNEL, { messageAdded: newMessage, channelId: message.channelId });
      // console.log("messazge publish" + message.channelId)

      return newMessage;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(CHANNEL1)
    },

  },
};

const test = pubsub.subscribe('messageAdded', (message)=> {console.log(message)})