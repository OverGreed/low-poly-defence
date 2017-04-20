'use strict';
const winston = require('winston');

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console()
    ]
});

logger.stream = {
    write(message, encoding){
        logger.info(message.trim());
    }
};
module.exports = logger;