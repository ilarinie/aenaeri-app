import { NextFunction, Request, Response } from 'express';
import jsonWebToken from 'jsonwebtoken';
import { UserEntity } from '../db/entities/User';
import { HttpException } from '../exceptions/HttpException';

export const generateToken = (user: UserEntity) => {
    return jsonWebToken.sign(
        { sub: user.id },
        process.env.SECRET as string,
        { expiresIn: '1h' },
    );
};

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.username || !req.body.password) {
        res.status(406).send('Missing password or username');
    } else {
        try {
            const user = await UserEntity.findOneOrFail({ username: req.body.username });
            if (await user.comparePassword(req.body.password)) {
                res.setHeader('Authentication', 'Bearer ' + generateToken(user));
                res.status(200).send({ token: generateToken(user), user: { username: user.username } });
            } else {
                next('Invalid login');
            }
        } catch (err) {
            next(new HttpException(401, 'Unauthorized.'));
        }
    }
};
