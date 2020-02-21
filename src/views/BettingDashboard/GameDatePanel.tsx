import React from 'react';
import styled from 'styled-components';


export const GameDatePanel = React.memo<{ date: Date }>(({date}) => (
    <Container>
        <DatePanel >
            {date.toLocaleDateString('fi-FI')}
        </DatePanel>
        <VerticalDivider today />
        <TimePanel>
            {date.toLocaleTimeString('fi-FI')}
        </TimePanel>
    </Container>
))

const DatePanel = styled.div`
    text-align: right;
    padding-right: 1em;
 
`

const TimePanel = styled.div`
    padding-left: 1em;
` 

const VerticalDivider = styled.div<{ today?: boolean}>`
    width: 1px;
    border: 0.5px solid white;
    ${props => props.today && `
        &:after {

            content: "today"
            z-index: 999;
            font-size: 20px;
        }
    `}
`;

const Container = styled.div`
    margin: 0 auto;
    grid-column: 1 / 5;
    grid-row: 1 / 1;
    font-size: 1.5rem;
    height: 2rem;
    display: grid;
    width: 100%;
    grid-template-columns: 49% 1px 49%;
    justify-content: center;
`;