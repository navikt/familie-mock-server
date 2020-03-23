import winston from 'winston';

const stdoutLogger = winston.createLogger({
    format: winston.format.simple(),
    level: 'info',
    transports: [new winston.transports.Console()],
});

export const logInfo = (message: string) => {
    stdoutLogger.info(message);
};

export const logWarning = (message: string) => {
    stdoutLogger.warn(message);
};

export const logError = (message: string, err?: Error) => {
    stdoutLogger.error(message, err);
};
