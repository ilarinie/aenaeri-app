import React from 'react';
import styled from 'styled-components';
import { Text } from 'rebass';
import { GameOddsAndResults } from '../../../server/db/mongo/GameOddsAndResultsSchema';

export const OddsRow = React.memo<{ odds: GameOddsAndResults }>(({ odds }) => {

    return (
        <Odds>
            <Text as='h4' color='secondaryAccent' style={{ margin: '0.3em 0', fontVariant: 'small-caps'}}>{odds.source}</Text>
            <OddsContent>
                <OddContainer>
                    <div>1</div>
                    {(odds.homeOdds / 100).toFixed(2)}
                </OddContainer>
                <OddContainer>
                    <div>
                        X
                    </div>
                    {odds.drawOdds && (odds.drawOdds / 100).toFixed(2) }
                </OddContainer>
                <OddContainer>
                    <div style={{ fontVariant: 'small-caps '}}>2</div>
                    {(odds.awayOdds / 100).toFixed(2)}
                </OddContainer>
            </OddsContent>
        </Odds>
    );
});

const OddContainer = styled.div`
    div {
        font-size: 0.5rem;
    }
    border-right: 0.5px dotted white;
    &:last-child {
        border-right: none;
    }
    width: 50%;
    margin: 0 auto;
    padding: 0.5em 0.5em;
    text-aling: center;

`;

const OddsContent = styled.div`
    display: flex;

`;

const Odds = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
`;
