import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '../db/entities/User';
import { VeikkausService } from '../services/VeikkausService/VeikkausService';
import { getConnection } from 'typeorm';

export const handleVLoginUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserEntity.findOneOrFail({ id: (req.user as any).id });
        const { vLogin, vPass } = req.body;
        user.vLogin = vLogin;
        user.vPass = vPass;
        await VeikkausService.getVeikkausAccountBalance(vLogin, vPass);
        await user.save();
        res.status(200).send({ message: 'Details updated succesfully'});
    } catch (err) {
        next({ status: 500, message: err });
    }
};
