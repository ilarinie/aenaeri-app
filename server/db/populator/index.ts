import { PlayerDataRefresh } from '../entities/PlayerDataRefresh';
import { populatePlayers } from './populatePlayers';
import { populateTeams } from './populateTeams';

export const populateDatabase = async () => {
    const lastRefresh = await PlayerDataRefresh.find({order: { id: 'DESC' }, take: 1 });
    let doRefresh = true;
    if (lastRefresh[0]) {
        doRefresh = (lastRefresh[0].refreshTime + 1000 * 60 * 60 < new Date().getTime());
    }
    if (doRefresh) {
        const playerIds = await populateTeams();
        await populatePlayers(playerIds);
        await PlayerDataRefresh.create({
            refreshTime: new Date().getTime(),
            fetchedPlayers: playerIds.length,
        }).save();
    }
};
