export const appConfig = {
  rabbitHost: process.env.rabbitHost || "localhost",
  rabbitPort : process.env.rabbitPort || "5672",

  redisHost: process.env.redisHost ||  "localhost",
  redisPort: process.env.redisPort || "6379",
  publishToEnrich: process.env.publishToEnrich || "publishToEnrich",

  batchNumber: Number (process.env.batchNumber ) || 1,
  totalNumberOfRounds: Number(process.env.totalNumberOfRounds) || 1000,


  keyId: "raw"

};
