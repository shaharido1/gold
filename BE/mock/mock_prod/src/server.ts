//
// const produserSetup = {
//   QueueType: 'rabbit', // 'redis';
//   number : 100,
//
// }
//
// const producer = new MockProducer( produserSetup.number);
// producer.init(3).then(() => {
//   producer.generateToQueue(MockDataGenerator.generateMockData())
// });


import { DataGenerator } from './dataGenertorgenerator';

const gen = new DataGenerator();
