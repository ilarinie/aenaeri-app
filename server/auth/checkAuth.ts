import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '../db/entities/User';
import logger from '../logger';
import passport from './passport';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'development') {
        req.user = await UserEntity.findOne();
        next();
        return;
    }
    passport.authenticate('jwt', { session: false }, (error, user: UserEntity) => {
        if (error || !user) {
            logger.error(`Authentication (JWT) failure: ${error}`);
            res.status(401).send('Unauthorized');
        } else {
            logger.info(`User found ${user.username}`);
            req.user = user;
            next(null);
        }
    })(req, res, next);
};
