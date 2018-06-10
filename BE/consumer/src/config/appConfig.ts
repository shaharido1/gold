export const appConfig = {
  rabbitHost: process.env.rabbitHost || "localhost",
  rabbitPort : process.env.rabbitPort || "5672",

  redisHost: process.env.redisHost ||  "localhost",
  redisPort: process.env.redisPort || "6379",
  publishToEnrich: process.env.publishToEnrich || "publishToEnrich",

  keyId: "raw"

};
