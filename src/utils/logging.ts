import * as winston from 'winston'

const config = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'blue',
        http: 'green',
        verbose: 'cyan',
        debug: 'purple',
        silly: 'pink'
    }
}

winston.addColors(config.colors)

const ignorePrivate = winston.format((info, opts) => {
    if(info.private) {
        return false
    }

    return info
})

export const logging: winston.Logger = winston.createLogger({
    levels: config.levels,
    format: winston.format.combine(
        ignorePrivate(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.label({ label: 'backend' }),
        winston.format.printf(({ timestamp, level, label, message}) => {
            return `${timestamp} [${label}] | [${level}]: ${message}`
        })
    ),
    transports: [
        new winston.transports.File({
            maxsize: 512000,
            filename: `${__dirname}/../logs/template-ts-prisma-postgresql_error.log`,
            level: 'error'
        }),
        new winston.transports.File({
            maxsize: 5120000,
            filename: `${__dirname}/../logs/template-ts-prisma-postgresql_all.log`,
            level: 'info',
        }),
    ],
    exitOnError: false
})