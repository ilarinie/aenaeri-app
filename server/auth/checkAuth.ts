import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '../db/entities/User';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'development' && !req.user && process.env.DEV_USER_NAME) {
        if (!req.user) {
            req.user = await UserEntity.findOne({ username: process.env.DEV_USER_NAME });
        }
    }
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!' });
    }
    next();
};
