import winston from "winston";

const securityLogger = winston.createLogger({
    level : "info",
    format : winston.format.json(),
    transports : [
        new winston.transports.File({filename: "src/logs/security.log"}),
    ],
});

export default securityLogger;