import { isDevMode } from '@angular/core';

export class Log {

  public static message(message?: any, ...optionalParams: any[]): void {
    if (isDevMode()) {
      console.log(message, optionalParams);
    }
  }

  public static warning(message?: any, ...optionalParams: any[]): void {
    if (isDevMode()) {
      console.warn(message, optionalParams);
    }
  }

  public static error(message?: any, ...optionalParams: any[]): void {
    if (isDevMode()) {
      console.error(message, optionalParams);
    }
  }

}
