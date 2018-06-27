export interface RabbitConfig {
  config_rabbitHost : string;
  config_rabbitPort : string;
  config_rabbitUser : string;
  config_rabbitPassword : string;

  config_rabbitQueueName? : string;
  config_persistent?: boolean;
}