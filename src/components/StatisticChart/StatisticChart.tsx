import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CartesianAxis, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
// import { GameStats } from '../../../server/models/GameStats';
import { SkaterGameStats, SkaterNumericGameStats } from '../../../server/models/SkaterGameStats';
import { RootState } from '../../state/rootReducer';
import { GameDataSeason } from '../../state/slices/gameStatsSlice';
import { SkaterStatSelector } from './StatSelector';

interface StatisticChartProps {
    data: StatisticChartDataObject;
    stat: keyof SkaterNumericGameStats;
}

interface StatisticChartDataObject {
    [playerId: string]: GameDataSeason | null;
}

// interface ChartDataItem {
//     time: number;
//     [playerId: string]: number;
// }

// const isSkaterGameStats = (x: GameStats): x is SkaterGameStats => {
//     return x !== null && x !== undefined && x.hasOwnProperty('goals');
// };

export const StatisticChart: React.FC<StatisticChartProps> = ({ data, stat }) => {

    const [selectedStat, setSelectedStat] = useState(stat);

    const players = useSelector((state: RootState) => state.baseData.players.playerObject);

    const computeCumulativeData = (gameDataSeasons: StatisticChartDataObject) => {

        let projected = 0;

        const duta = Object.keys(gameDataSeasons).map((playerId) => {
            let cumTotal = 0;

            const arr = gameDataSeasons[playerId]?.dateList.map((date) => {
                const dataPoint =  {
                    [playerId]: cumTotal + (gameDataSeasons[playerId]?.gameDataObject[date] as SkaterGameStats)[selectedStat],
                    time: new Date(date).getTime(),
                };
                cumTotal = dataPoint[playerId];
                return dataPoint;
            });
            if (
                gameDataSeasons[playerId]?.season === '20192020'
            ) {
                projected = Math.ceil(cumTotal / (arr ? arr.length : 1) * 82);
            }
            return arr;
        });

        if (duta[1]) {
            duta[1] = (duta[1] as any[]).map((duu: any) => {
                return {
                    ...duu,
                    time: duu.time + 31556952000,
                };
            });
        }

        const fukka = duta[1] ? [ ...duta[0] as any[], ...duta[1] as any[]] : duta[0];
        return { data: fukka, projected };
    };

    const renderLines = useMemo(() => (
        Object.keys(data).map((key) => (
            <Line key={key} dataKey={key} name={players[key.substr(0, 7)].fullName + ' - ' + key.substr(8, 8)} stroke={key.includes('20192020') ? '#BB86FC' : '#03DAC5'} connectNulls dot={false} />
        ))
    ), [data, players]);

    const formattedData = useMemo(() => computeCumulativeData(data), [data, selectedStat]);

    return (
        <>
            <ResponsiveContainer height={300}>
                <LineChart data={formattedData.data}>
                    <XAxis
                        dataKey='time'
                        scale='time'
                        type='number'
                        domain={[new Date('2019-10-02').getTime(),  new Date('2020-04-05').getTime()]}
                        tick={CustomTick}
                    />
                    {renderLines}
                    <YAxis domain={[0, formattedData.projected + 20]}  />
                    <CartesianAxis  />
                    <Legend />
                    <Tooltip labelFormatter={(props: any) => <span>{new Date(props).toLocaleDateString()}</span>}/>
                    <ReferenceLine y={formattedData.projected} label={(props) => <CustomLabel {...props} projected={formattedData.projected} />} />
                </LineChart>
            </ResponsiveContainer>
            <SkaterStatSelector value={selectedStat} onChange={setSelectedStat} />
        </>
    );
};

const CustomLabel = (props: any) => {
    return (
        <text x={900} textAnchor='right' fill='white' y={props.viewBox.y - 15}>Projected: {props.projected}</text>
    );
};

const CustomTick = (props: any) => {
    return (
        <text x={props.x} textAnchor='middle' fill='white' y={props.y + 15}>{new Date(props.payload.value).toLocaleDateString()}</text>
    );
};
