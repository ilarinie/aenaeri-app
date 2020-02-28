import { NextFunction, Request, Response } from 'express';
import { IVerifyOptions } from 'passport-local';
import { UserEntity } from '../db/entities/User';
import logger from '../logger';
import passport from './passport';

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error, user: UserEntity, info: IVerifyOptions) => {
        if (err) { return next(err); }
        if (!user) {
            return res.status(401).send({ message: 'Invalid username or password'});
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            res.send({ username: user.username });
        });
    })(req, res, next);
};

export const handleLogout = async (req: Request, res: Response, next: NextFunction) => {
    req.logout();
    logger.info('Loggd out');
    res.redirect('/');
};
