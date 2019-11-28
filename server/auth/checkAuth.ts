import { NextFunction, Request, Response } from 'express';
import logger from '../logger';
import passport from './passport';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error) {
            logger.error(`Authentication (JWT) failure: ${error}`);
            res.status(401).send('Unauthorized');
        } else {
            logger.info(`User found ${user}`);
            req.user = user;
            next(null);
        }
    })(req, res, next);
};
