import { NextFunction, Request, Response } from 'express';

export const handleTestAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        res.status(200).send({ user: req.user });
    } else {
        res.status(401).send('No bueno');
    }
};
