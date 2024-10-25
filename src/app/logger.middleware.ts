import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const environment = process.env.NODE_ENV || 'dev';

    const format = environment === 'dev' ? 'dev' : 'combined';

    morgan(format)(req, res, next);
  }
}
