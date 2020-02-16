import { Request, Response } from 'express';
import { VeikkausService } from '../services/VeikkausService/VeikkausService';
import { User } from '../models/User';
import fs from 'fs';

export const handleVeikkausCheckup = async (req: Request, res: Response) => {
    const { vLogin, vPass } = req.user as User;
    const balance = await VeikkausService.getVeikkausAccountBalance(vLogin, vPass);
    const events = await VeikkausService.getNHLGames();
    fs.writeFile('events.json', JSON.stringify(events, null, 2), (err) => {});
    res.status(200).send(balance);
}