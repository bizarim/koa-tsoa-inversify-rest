"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const fs = require("fs");
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
var eLogLevel;
(function (eLogLevel) {
    eLogLevel["debug"] = "debug";
    eLogLevel["info"] = "info";
    eLogLevel["warn"] = "warn";
    eLogLevel["error"] = "error";
})(eLogLevel = exports.eLogLevel || (exports.eLogLevel = {}));
class Logger {
    constructor() {
        this.logger = createLogger();
    }
    static getInstance() {
        if (undefined === Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(level, message, ...meta) {
        if (meta.length < 1) {
            if (undefined === message)
                this.logger.log(level);
            else
                this.logger.log(level, message);
        }
        else
            this.logger.log(level, message, meta);
    }
    error(message, ...meta) {
        if (meta.length < 1) {
            this.logger.log(eLogLevel.error, message);
        }
        else {
            this.logger.log(eLogLevel.error, message, meta);
        }
    }
    debug(message, ...meta) {
        if (meta.length < 1) {
            this.logger.log(eLogLevel.debug, message);
        }
        else {
            this.logger.log(eLogLevel.debug, message, meta);
        }
    }
    info(message, ...meta) {
        if (meta.length < 1) {
            this.logger.log(eLogLevel.info, message);
        }
        else {
            this.logger.log(eLogLevel.info, message, meta);
        }
    }
    warn(message, ...meta) {
        if (meta.length < 1) {
            this.logger.log(eLogLevel.warn, message);
        }
        else {
            this.logger.log(eLogLevel.warn, message, meta);
        }
    }
}
exports.Logger = Logger;
const numCPUs = os.cpus().length;
const logMaxSize = parseFloat((2048 / numCPUs).toFixed()) * 1000 * 100; // 용량 제한 102400 => 100 kb, 102400000 => 100mb, 10240000 => 10mb
/**
 * winston 로거 생성
 */
function createLogger( /*config: Config*/) {
    // todo config
    const logDir = 'logs'; // config.logPath
    // let logDir = '/home/logs'// config.logPath
    const name = 'testapisvr'; // config.name
    // create log directory
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    const options = {
        level: 'debug',
        format: winston.format.combine(
        // winston.format.json(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), winston.format.printf((info) => `${info.timestamp} [${info.level}] - ${info.message}`)),
        // logger setting
        transports: [
            // console setting
            new winston.transports.Console({ level: 'debug' }),
            new DailyRotateFile({
                level: 'debug',
                filename: `${logDir}/log/${name}_%DATE%.log`,
                datePattern: 'YYYY-MM-DD',
                maxSize: logMaxSize
            })
        ],
        // uncaughtException 발생시 처리
        exceptionHandlers: [
            new winston.transports.Console(),
            new DailyRotateFile({
                level: 'debug',
                filename: `${logDir}/exception/ex_${name}_%DATE%.log`,
                datePattern: 'YYYY-MM-DD',
                maxSize: logMaxSize
            })
        ]
    };
    // logger
    const logger = winston.createLogger(options);
    // console.log(numCPUs);
    // console.log(logMaxSize);
    logger.debug('pid: ' + process.pid + ' numCPUs: ' + numCPUs);
    logger.debug('pid: ' + process.pid + ' logMaxSize: ' + logMaxSize);
    return logger;
}
exports.createLogger = createLogger;
//# sourceMappingURL=Logger.js.map