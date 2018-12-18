/**
 * This is a "ngx-logger" branch (https://www.npmjs.com/package/ngx-logger)
 * Customized logging template + Simplified into our needs
 *
 * @author Saber Chebka, saber.chebka@gmail.com
 */
import {HttpClient, HttpHeaders} from '@angular/common/http';

export class Logger {
    private _clientLogLevel: LoggerLevel = LoggerLevel.INFO;

    private _serverLogLevel: LoggerLevel = LoggerLevel.OFF;

    private _isIE = true;

    private options: LoggerConfig = {
            level: this._clientLogLevel,
            serverLogLevel: this._serverLogLevel,
            serverLoggingUrl: '/remotelog.do'
          };

    constructor(private _class: string, private http?: HttpClient) {
        this._isIE = !!(navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.match(/Trident\//) || navigator.userAgent.match(/Edge\//));
    }

    trace(message, ...additional: any[]) {
      this._log(LoggerLevel.TRACE, true, message, additional);
    }

    debug(message, ...additional: any[]) {
      this._log(LoggerLevel.DEBUG, true, message, additional);
    }

    info(message, ...additional: any[]) {
      this._log(LoggerLevel.INFO, true, message, additional);
    }

    log(message, ...additional: any[]) {
      this._log(LoggerLevel.LOG, true, message, additional);
    }

    warn(message, ...additional: any[]) {
      this._log(LoggerLevel.WARN, true, message, additional);
    }

    error(message, ...additional: any[]) {
      this._log(LoggerLevel.ERROR, true, message, additional);
    }

    private _timestamp() {
      return new Date().toISOString();
    }

    private _logOnServer(level: LoggerLevel, message, additional: any[]) {
      if (!this.options.serverLoggingUrl) {
        return;
      }

      // if the user provides a serverLogLevel and the current level is than that do not log
      if (level < this._serverLogLevel) {
        return;
      }

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.post(this.options.serverLoggingUrl, {
        level: Levels[level],
        message,
        additional,
        timestamp: this._timestamp()
      }, {headers})
        .subscribe(
          res => null,
          error => this._log(LoggerLevel.ERROR, false, 'FAILED TO LOG ON SERVER')
        );
    }

    private _logIE(level: LoggerLevel, message: string, additional: any[]) {
      switch (level) {
        case LoggerLevel.WARN:
          console.warn(`${this._timestamp()} [${Levels[level]}]  -${this._class}-`, message, ...additional);
          break;
        case LoggerLevel.ERROR:
          console.error(`${this._timestamp()} [${Levels[level]}]  -${this._class}-`, message, ...additional);
          break;
        case LoggerLevel.INFO:
          console.info(`${this._timestamp()} [${Levels[level]}]  -${this._class}-`, message, ...additional);
          break;
        default:
          console.log(`${this._timestamp()} [${Levels[level]}]  -${this._class}-`, message, ...additional);
      }
    }

    private _log(level: LoggerLevel, logOnServer: boolean, message, additional: any[] = []) {
      if (!message) {
        return;
      }

      // Allow logging on server even if client log level is off
      if (logOnServer) {
        this._logOnServer(level, message, additional);
      }

      // if no message or the log level is less than the environ
      if (level < this._clientLogLevel) {
        return;
      }

      if (typeof message === 'object') {
        try {
          message = JSON.stringify(message, null, 2);
        } catch (e) {
          additional = [message, ...additional];
          message = 'circular object in message. ';
        }
      }

      // Coloring doesn't work in IE
      if (this._isIE) {
        return this._logIE(level, message, additional);
      }

      const color = this._getColor(level);

      console.log(`%c${this._timestamp()} [${Levels[level]}] - ${this._class} -`, `color:${color}`, message, ...additional);
    }

    private _getColor(level: LoggerLevel) {
      switch (level) {
        case LoggerLevel.TRACE:
          return 'blue';
        case LoggerLevel.DEBUG:
          return 'teal';
        case LoggerLevel.INFO:
        case LoggerLevel.LOG:
          return 'gray';
        case LoggerLevel.WARN:
        case LoggerLevel.ERROR:
          return 'red';
        case LoggerLevel.OFF:
        default:
          return 'black';
      }
    }
}

export class LoggerConfig {
    level: LoggerLevel;
    serverLogLevel: LoggerLevel;
    serverLoggingUrl?: string;
  }

  export enum LoggerLevel {
      TRACE = 0, DEBUG, INFO, LOG, WARN, ERROR, OFF
  }

  const Levels = [
      'TRACE',
      'DEBUG',
      'INFO',
      'LOG',
      'WARN',
      'ERROR',
      'OFF'
  ];
