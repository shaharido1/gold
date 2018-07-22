
import { connect, Channel, Connection } from 'amqplib';

connect(`amqp://guest:guest@localhost:5672`).then(connection => {
  connect(`amqp://guest:guest@localhost:5672`).then(connection => {

  });
});
