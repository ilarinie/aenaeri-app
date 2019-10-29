import { NextFunction, Request, Response } from 'express';
import requestIp from 'request-ip';
import { Test } from '../db/entities/Test';
import { HttpException } from '../exceptions/HttpException';
import { TeamEntity } from '../db/entities/Team';

export const handleTestRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdTest = await Test.create({ message: `Your ip is: ${requestIp.getClientIp(req)} `});
        await createdTest.save();
        const newTest = await Test.findOneOrFail({ id: createdTest.id });
        res.send(await TeamEntity.find());
    } catch (err) {
        next(new HttpException(500, 'Something went went wrong'))
    }
};
