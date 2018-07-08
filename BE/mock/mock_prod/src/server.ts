import { MockProducer } from './producer';
import { MockDataGenerator } from './mockDataGeneretor/mockDataGeneretor';

const QueueType = 'rabbit'; // 'redis';
const number = 100;

const producer = new MockProducer(QueueType, number);
producer.init(3).then(() => {
  producer.generateToQueue(MockDataGenerator.generateMockData())
});
