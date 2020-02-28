import { Select } from '@rebass/forms'
import React from 'react';
import styled from 'styled-components';
import { SkaterNumericGameStats } from '../../../server/models/SkaterGameStats';

const EmptySkaterNumericGameStats: SkaterNumericGameStats = {
    assists: 0,
    goals: 0,
    pim: 0,
    shots: 0,
    games: 0,
    hits: 0,
    powerPlayGoals: 0,
    powerPlayPoints: 0,
    gameWinningGoals: 0,
    overTimeGoals: 0,
    shortHandedGoals: 0,
    shortHandedPoints: 0,
    blocked: 0,
    plusMinus: 0,
    points: 0,
    shifts: 0,
};

interface SkaterStatSelectorProps {
    onChange: (stat: keyof SkaterNumericGameStats) => void;
    value: keyof SkaterNumericGameStats;
}

export const SkaterStatSelector: React.FC<SkaterStatSelectorProps> = ({ value, onChange }) => {

    return (
        <Container>
            <Select value={value} onChange={(event: any) => onChange(event.target.value)}>
                {
                    Object.keys(EmptySkaterNumericGameStats).map((key) => (
                        <option key={key}>{key}</option>
                    ))
                }
            </Select>
        </Container >
    );
};

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;
