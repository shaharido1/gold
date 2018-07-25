export interface RedisConfig {
    config_redisHost: string;
    config_redisPort: number;
    reconnect: number;
    config_redisQueueName?: string;
}
