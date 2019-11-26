import { NextFunction, Request, Response } from 'express';
import { DaySchedule } from '../models/DaySchedule';
import { NhlApiService } from '../services/NHLApiService/NhlApiService';

export const handleCurrentDayScheduleRoute = async (req: Request, res: Response, next: NextFunction) => {
    const response = await NhlApiService.fetchCurrentDaySchedule();
    const resObj: DaySchedule = {
        ...response.dates[0],
    };
    res.send(resObj);
};
