

export const appConfig = {
  rabbitPort : process.env.port || "5672",
  redisHost: process.env.domainName || "localhost"
};
