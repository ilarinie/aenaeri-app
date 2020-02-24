import ExtendedBoxScoreSchema, { ExtendedBoxScoreSchemaDocumentType } from '../mongo/ExtendedBoxScoreSchema';
import { addDays, subDays } from 'date-fns';
import logger from '../../logger';

/**
 * Returns a list of games that have start time between today morning (8:00), until tomorrow at 15:00,
 * Unless  its early morning < 6:00, then it returns 'yesterdays' games
 */
export const todaysGames = async (): Promise<ExtendedBoxScoreSchemaDocumentType[]> => {
    const currentDate   = new Date();

    let todayMorning
    let tomorrowAfternoon;

    if (currentDate.getHours() < 3) {
        todayMorning = subDays(currentDate, 1);
        todayMorning.setHours(8);
        tomorrowAfternoon = addDays(currentDate, 8)

    } else {
        todayMorning = currentDate;
        tomorrowAfternoon = addDays(currentDate, 1);
    }
    todayMorning.setHours(8);
    tomorrowAfternoon.setHours(15);

    try {
        const response = await ExtendedBoxScoreSchema.find({ 'gameData.datetime.dateTime': { $gt: todayMorning, $lt: tomorrowAfternoon }}).sort({ gamePk: 1});
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
}