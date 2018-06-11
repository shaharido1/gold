export const appConfig = {
  redisHost: process.env.redisHost || "localhost",
  redisPort: process.env.redisPort || 6379,
  publishToApollo: process.env.redisChane2 || "publishToApollo",


  keyId: "enrich"

};
