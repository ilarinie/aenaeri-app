import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';

export const handleTestAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        res.status(200).send({ user: { username: (req.user as User).username } });
    } else {
        res.status(401).send('No bueno');
    }
};
