const winston = require("winston");
const WinstonCloudWatch = require("winston-cloudwatch");
const logger = new winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      timestamp: true,
      colorize: true,
    }),
  ],
});
const cloudwatchConfig = {
  logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
  logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}`,
  awsAccessKeyId: process.env.CLOUDWATCH_ACCESS_KEY,
  awsSecretKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
  awsRegion: process.env.CLOUDWATCH_REGION,
  messageFormatter: ({ level, message, additionalInfo }) =>
    `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(
      additionalInfo
    )}}`,
};
logger.add(new WinstonCloudWatch(cloudwatchConfig));
module.exports = logger;
