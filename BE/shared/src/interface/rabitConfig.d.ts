import { Options } from 'amqplib/properties';
export interface RabbitConfig {
    config_rabbitHost: string;
    config_rabbitPort: string;
    config_rabbitUser: string;
    config_rabbitPassword: string;
    config_rabbitQueueName?: string;
    config_persistentAndDurable?: boolean;
    config_queueOptions?: Options.Consume;
}
