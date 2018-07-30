import { RabbitConfig } from '../../../interface/rabitConfig';

export const rabbitDefaultConfig : RabbitConfig = {
  config_rabbitHost: '10.0.75.1',
  config_rabbitPort: '5672',
  config_rabbitUser: 'guest',
  config_rabbitPassword: 'guest',
  config_rabbitQueueName: 'q',
  config_persistentAndDurable: true
}