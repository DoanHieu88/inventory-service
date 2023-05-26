import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BAD_REQUEST_EXCEPTION } from '../constant/exception-constant';

type ExtendException = {
  msg: string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let errorCode: string = BAD_REQUEST_EXCEPTION;
    const excepResponse: string | object = exception.getResponse();
    if (typeof excepResponse == 'string') {
      errorCode = excepResponse;
    } else if (typeof excepResponse == 'object') {
      errorCode = (excepResponse as ExtendException).msg || exception.message;
    }
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.status(status).json({
      signal: 0,
      status: HttpStatus[status],
      code: status,
      errorCode,
      detail: excepResponse,
    });
  }
}
