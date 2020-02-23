import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '../db/entities/User';
import passport from './passport';
import { IVerifyOptions } from 'passport-local';

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: Error, user: UserEntity, info: IVerifyOptions) => {
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
