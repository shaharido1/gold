export declare enum levels {
    FATAL = "fatal",
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug",
    TRACE = "trace"
}
export interface MyLoggerOptions {
    name: string;
    path: string;
}
