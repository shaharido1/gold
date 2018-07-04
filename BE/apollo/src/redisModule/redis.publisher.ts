import redis from 'redis';


export const CHANNEL = 'messageAdded';

export class MockPublisher {
  client;
  dataBase = [];
  MockData = [
    { 'position': { 'x': -75.1641667, 'y': 20.9522222 }, 'rank': 1, 'category': 'c', id: '1' },
    { 'position': { 'x': -70.1641667, 'y': 21.9022222 }, 'rank': 2, 'category': 'b', id: '2' },
    { 'position': { 'x': -65.1641667, 'y': 22.6522222 }, 'rank': 3, 'category': 'a', id: '3' },
    { 'position': { 'x': -55.1641667, 'y': 23.5522222 }, 'rank': 4, 'category': 'b', id: '4' },
    { 'position': { 'x': -45.1641667, 'y': 24.4522222 }, 'rank': 1, 'category': 'a', id: '5' },
    { 'position': { 'x': -35.1641667, 'y': 25.3522222 }, 'rank': 1, 'category': 'b', id: '6' },
    { 'position': { 'x': -25.1641667, 'y': 26.2522222 }, 'rank': 1, 'category': 'a', id: '7' },
    { 'position': { 'x': -15.1641667, 'y': 27.1522222 }, 'rank': 1, 'category': 'b', id: '8' },
    { 'position': { 'x': -74.1641667, 'y': 28.9422222 }, 'rank': 1, 'category': 'a', id: '9' },
    { 'position': { 'x': -25.1641667, 'y': 29.2522222 }, 'rank': 1, 'category': 'b', id: '10' },
    { 'position': { 'x': -55.1641667, 'y': 30.5522222 }, 'rank': 7, 'category': 'c', id: '11' },
    { 'position': { 'x': -52.1641667, 'y': 31.5222222 }, 'rank': 1, 'category': 'b', id: '12' },
    { 'position': { 'x': -37.1641667, 'y': 32.3722222 }, 'rank': 1, 'category': 'a', id: '13' },
    { 'position': { 'x': -85.1641667, 'y': 33.8522222 }, 'rank': 1, 'category': 'b', id: '14' },
    { 'position': { 'x': -95.1641667, 'y': 35.9522222 }, 'rank': 1, 'category': 'a', id: '15' },
    { 'position': { 'x': -79.1641667, 'y': 40.9922222 }, 'rank': 1, 'category': 'b', id: '16' }
  ];
  multi;


  constructor() {
    this.client = redis.createClient();
    this.multi = this.client.multi();
    this.init();

  }

  init() {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      const entity = this.MockData[Math.floor(Math.random() * 10)] || this.MockData[0];
      const message = {
        message: `ms-${i}`,
        id: entity.id,
        position: entity.position,
        rank: entity.rank,
        category: entity.category
      };
      this.multi.publish(CHANNEL, JSON.stringify(message));
      this.multi.hmset('messages_' + message.id, 'id', message.id, 'message', message.message);
      this.multi.exec();
    }, 1000);

  }


  getFromRedis() {
    this.client.hgetall('message_*', (some) => {
      console.log(some);
    });
  }

}
