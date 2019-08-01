import * as os from 'os';
import * as fs from 'fs';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export enum eLogLevel {
    debug = 'debug',
    info = 'info',
    warn = 'warn',
    error = 'error',
}

interface ILogMethod {
    (level: string, message?: string): void;
    (level: string, message?: string, meta?: any): void;
    (level: string, message?: string, ...meta: any[]): void;
}

interface ILeveledLogMethod {
    (message: string): void;
    (message: string, meta: any): void;
    (message: string, ...meta: any[]): void;
}

export interface ILogger {
    log: ILogMethod;
    error: ILeveledLogMethod;
    debug: ILeveledLogMethod;
    info: ILeveledLogMethod;
    warn: ILeveledLogMethod;
}


export class Logger implements ILogger {
    private static instance: ILogger;
    private logger: ILogger;
    private constructor() {
        this.logger = createLogger();
    }
    public static getInstance(): ILogger {
        if (undefined === Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public log(level: eLogLevel, message?: string, ...meta: any[]): void {
        if (meta.length < 1) {
            if (undefined === message) this.logger.log(level);
            else this.logger.log(level, message);
        }
        else this.logger.log(level, message as string, meta);
    }

    public error(message: string, ...meta: any[]): void {
        if (meta.length < 1) {
            this.logger.log(eLogLevel.error, message);
        } else {
            this.logger.log(eLogLevel.error, message, meta);
        }
    }

    public debug(message: string, ...meta: any[]): void {
        if (meta.length < 1) {
            this.logger.log(eLogLevel.debug, message);
        } else {
            this.logger.log(eLogLevel.debug, message, meta);
        }
    }

    public info(message: string, ...meta: any[]): void {
        if (meta.length < 1) {
            this.logger.log(eLogLevel.info, message);
        } else {
            this.logger.log(eLogLevel.info, message, meta);
        }
    }

    public warn(message: string, ...meta: any[]): void {
        if (meta.length < 1) {
            this.logger.log(eLogLevel.warn, message);
        } else {
            this.logger.log(eLogLevel.warn, message, meta);
        }
    }
}

const numCPUs: number = os.cpus().length;
const logMaxSize: number = parseFloat((2048 / numCPUs).toFixed()) * 1000 * 100;     // 용량 제한 102400 => 100 kb, 102400000 => 100mb, 10240000 => 10mb

/**
 * winston 로거 생성
 */
export function createLogger(/*config: Config*/): ILogger {
    // todo config
    const logDir = 'logs'; // config.logPath
    // let logDir = '/home/logs'// config.logPath
    const name = 'testapisvr'; // config.name

    // create log directory
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    const options: winston.LoggerOptions = {
        level: 'debug',
        format: winston.format.combine(
            // winston.format.json(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
            winston.format.printf((info) => `${info.timestamp} [${info.level}] - ${info.message}`)
        ),
        // logger setting
        transports: [
            // console setting
            new winston.transports.Console({ level: 'debug' }),
            new DailyRotateFile({
                level: 'debug',      // 로그 레벨 지정
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
                datePattern: 'YYYY-MM-DD',  // 시간 별로 파일을 다르게 남길지 고민해 보자.
                maxSize: logMaxSize
            })
        ]
    };

    // logger
    const logger: ILogger = winston.createLogger(options) as ILogger;

    // console.log(numCPUs);
    // console.log(logMaxSize);
    logger.debug('pid: ' + process.pid + ' numCPUs: ' + numCPUs);
    logger.debug('pid: ' + process.pid + ' logMaxSize: ' + logMaxSize);

    return logger;
}
