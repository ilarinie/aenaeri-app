import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { addDays, format, subDays } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { PulseLoader} from 'react-spinners';
import { Box, Text } from 'rebass';
import styled from 'styled-components';
import { ExtendedBoxScore } from '../../../server/models/ExtendedBoxScoreType/index';
import { RootState } from '../../state/rootReducer';
import { NextGameItem } from './NextGameItem';
import { mq } from '../../theme';

interface NextGamesPanelProps {

}

const nextGameDates = () => {
    const currentDate   = new Date();

    let todayMorning;
    let tomorrowAfternoon;

    if (currentDate.getHours() < 3) {
        todayMorning = subDays(currentDate, 1);
        todayMorning.setHours(8);
        tomorrowAfternoon = addDays(currentDate, 0);

    } else {
        todayMorning = currentDate;
        tomorrowAfternoon = addDays(currentDate, 1);
    }
    todayMorning.setHours(8);
    tomorrowAfternoon.setHours(15);

    return { todayMorning, tomorrowAfternoon };
};

const { todayMorning, tomorrowAfternoon } = nextGameDates();

export const NextGamesPanel: React.FC<NextGamesPanelProps> = () => {

    const teams = useSelector((state: RootState) => state.baseData.teamStats);

    const { data, loading, error } = useQuery<{ boxScores: ExtendedBoxScore[] }>(query(todayMorning.getTime().toString(), tomorrowAfternoon.getTime().toString()), {
        pollInterval: 5000,
    });

    return (
        <Box
            p={4}
            sx={{
                [mq[1]]: {
                    padding: '0.2em'
                }
            }}
        >
            <Text my={2} as='h1'>Betting</Text>
            {
                data && data.boxScores[0] && data.boxScores[0].odds[0] && <div>Last refresh  {format(new Date(parseInt(data.boxScores[0].odds[0].updatedAt.toString()) || ''), 'HH:mm')}</div>
            }
            <ScheduleContainer>
                {data ?
                    data.boxScores.map((g) => (
                        <NextGameItem width='400px' key={g.gamePk} game={g} teamsStats={teams} />
                    ))
                    :
                    <LoadingContainer>
                        <PulseLoader size={50} color='white' />
                    </LoadingContainer>
                }
            </ScheduleContainer>
        </Box>
    );
};

const query = (from: string,  to: string) => gql`
    query {
        boxScores(from: ${'"' + from + '"'}, to: ${'"' + to + '"'}) {
            gamePk
            gameData {
                datetime {
                    dateTime
                }
                teams {
                    away {
                        id
                    }
                    home {
                        id
                    }
                }
            }
            odds(gameNames: ["1X2", "12"]) {
                homeOdds
                gameName
                awayOdds
                drawOdds
                source
                bookMakerId
                updatedAt
            }
        }
}

`;

const LoadingContainer = styled.div`
   width: 100%;
   height: 300px;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const ScheduleContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
