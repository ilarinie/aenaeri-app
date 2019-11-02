import { NextFunction, Request, Response } from 'express';
import requestIp from 'request-ip';
import { TeamEntity } from '../db/entities/Team';
import { Test } from '../db/entities/Test';
import { HttpException } from '../exceptions/HttpException';

export const handleTestRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdTest = await Test.create({ message: `Your ip is: ${requestIp.getClientIp(req)} `});
        await createdTest.save();
        res.send(await TeamEntity.find());
    } catch (err) {
        next(new HttpException(500, 'Something went went wrong'));
    }
};
