import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import logger from '../logger';

export const handleError = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    logger.error(`Error sent to error handler:` )
    logger.error(`${status}: ${message}`);
    logger.debug(err.stack ? err.stack : '');
    res.status(status).send({
      status,
      message,
    });
};
