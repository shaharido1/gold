

export const appConfig = {
  rabbitPort : process.env.port || "5672",
  rabbitHost: process.env.rabbitHost || "localhost",
  batchNumber: process.env.batchNumber || 500
};
