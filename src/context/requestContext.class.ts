import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RequestContextClass {
  private static request: Request;

  static getIsMobile(): boolean {
    return Boolean(this.request.header('is-mobile'));
  }

  static setRequest(request: Request): void {
    this.request = request;
  }

  static getRequest(): Request {
    return this.request;
  }
}
