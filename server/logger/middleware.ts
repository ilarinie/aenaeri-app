import { NextFunction, Request, Response } from 'express';
import requestIp from 'request-ip';
import logger from '.';

export const loggerMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    logger.log('info', `${req.method} ${req.path} from ${requestIp.getClientIp(req)}`);
    // tslint:disable-next-line
    req.body && logger.log('info', `Body:\n${JSON.stringify(req.body, null, 2)}`);
    next();
};
