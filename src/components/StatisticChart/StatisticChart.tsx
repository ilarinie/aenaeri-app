import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { GameStats } from '../../../server/models/GameStats';
import { SkaterGameStats, SkaterNumericGameStats } from '../../../server/models/SkaterGameStats';
import { RootState } from '../../state/rootReducer';
import { GameDataSeason } from '../../state/slices/gameStatsSlice';
import { generateSeasonTicks } from './generateSeasonTicks';
import { SkaterStatSelector } from './StatSelector';

interface StatisticChartProps {
    data: StatisticChartDataObject;
    stat: keyof SkaterNumericGameStats;
}

interface StatisticChartDataObject {
    [playerId: string]: GameDataSeason;
}

const isSkaterGameStats = (x: GameStats): x is SkaterGameStats => {
    return x !== null && x !== undefined && x.hasOwnProperty('goals');
};

export const StatisticChart: React.FC<StatisticChartProps> = ({ data, stat }) => {

    const [selectedStat, setSelectedStat] = useState(stat);

    const players = useSelector((state: RootState) => state.baseData.players.playerObject);

    const computeCumulativeData = (gameDataSeason: StatisticChartDataObject) => {
        const playerStatArrays: Array<{ [date: string]: { playerId: string, value: number; }; }> = Object.keys(gameDataSeason).map((playerId) => {
            let cumulativeTotal = 0;
            const obj: any = {};
            gameDataSeason[playerId].dateList.forEach((date) => {
                if (isSkaterGameStats(gameDataSeason[playerId].gameDataObject[date])) {
                    cumulativeTotal = cumulativeTotal + (gameDataSeason[playerId].gameDataObject[date] as SkaterGameStats)[selectedStat];
                    obj[date] = { playerId, value: cumulativeTotal };
                }
            });
            return obj;
        });

        return generateSeasonTicks().map((d) => {
            const obj: any = { date: d };
            playerStatArrays.forEach((a) => {
                if (a[d]) {
                    obj[a[d].playerId] = a[d].value;
                }
            });
            return obj;
        });

    };

    const renderLines = useMemo(() => (
        Object.keys(data).map((key) => (
            <Line key={key} dataKey={key} name={players[key].fullName} connectNulls dot={false} />
        ))
    ), [data, players, selectedStat]);

    const formattedData = useMemo(() => computeCumulativeData(data), [data, selectedStat]);

    return (
        <>
            <ResponsiveContainer height={300}>
                <LineChart data={formattedData}>
                    <XAxis type='category' dataKey='date' tickCount={5} />
                    {renderLines}
                    <YAxis domain={[0, 100]} />
                    <Legend />
                    <Tooltip />
                    <ReferenceLine y={50} />
                </LineChart>
            </ResponsiveContainer>
            <SkaterStatSelector value={selectedStat} onChange={setSelectedStat} />
        </>
    );
};
