const logger = require("pino")({
  prettyPrint: process.env.NODE_ENV === "development"
});

const expressLoggerMiddleware = require("express-pino-logger")({
  prettyPrint: process.env.NODE_ENV === "development"
});

module.exports = { logger, expressLoggerMiddleware };
