import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const resContent: any = exception.getResponse();
      
      if (typeof resContent === 'object' && resContent !== null) {
        message = resContent.message || exception.message;
        error = resContent.error || exception.name;
      } else {
        message = resContent || exception.message;
      }
    } else {
      // Log unhandled non-http errors for debugging
      console.error('Unhandled Exception:', exception);
      message = exception.message || message;
    }

    response.status(status).json({
      statusCode: status,
      error: error,
      message: message,
    });
  }
}
