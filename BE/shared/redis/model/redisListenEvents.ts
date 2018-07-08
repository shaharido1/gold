export enum RedisListenEvents {
  READY = 'ready',
  MESSAGE = 'message',
  ERROR = 'error',
  RECONNECTING = 'reconnecting',
  CONNECT = 'connect',
}

export enum RedisConnectionSetup {
  ECONNREFUSED = 'ECONNREFUSED',
  TOTAL_RETRY_TIMES = 5000,
  RETRY_TIME = 1000

}