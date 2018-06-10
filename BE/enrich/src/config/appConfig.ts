export const appConfig = {
  redisHost: process.env.redisHost || "172.18.0.2",
  redisPort: process.env.redisPort || 6379,
  publishToEnrich: process.env.redisChanel || "publishToEnrich",
  publishToApollo: process.env.redisChanel || "publishToApollo",

  keyId: "enrich"

};
