import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PlayerBaseDataResponse, TeamBaseDataResponse } from '../../server/models/BaseDataResponse';
import { useDebounce } from '../hooks/useDebounce';

export const TopBarSearch: React.FC<{ players: PlayerBaseDataResponse, teams: TeamBaseDataResponse, navigate: (path: string) => void }> = ({ players, teams, navigate}) => {

    const [dataSet, setDataSet] = useState([] as Array<{ text: string, value: string}>);
    const [ searchText, setSearchText ] = useState('');
    const [ foundItem, setFoundItem ] = useState(null as null | { text: string, value: string });
    const debouncedSearchText = useDebounce(searchText, 300);

    useEffect(() => {
        const data = players.playerList.map((id) => ({ text: players.playerObject[id].fullName, value: id }));
        data.push(...teams.teamList.map((id) => ({ text: teams.teamObject[id].name, value: id })));
        setDataSet(data);
    }, [ players, teams ]);

    useEffect(() => {
        if (debouncedSearchText.length > 5) {
            const filtered = dataSet.filter((e) => {
                return e.text.toLowerCase() === debouncedSearchText.toLowerCase();
            })[0];
            setFoundItem(filtered);
        } else {
            setFoundItem(null);
        }
    }, [ debouncedSearchText, dataSet ]);

    const handleSearchChange = (event: any) => {
        const newSearchText = event.target.value;
        setSearchText(newSearchText);
    };

    const handleInputKeyPress = (event: any) => {
        if (event.key === 'Enter') {
          if (foundItem) {
            const parsedId = parseInt(foundItem.value, 10);
            if (parsedId < 100) {
                navigate('/teams/' + parsedId);
            } else {
                navigate('/players/' + parsedId);
            }
            setSearchText('');
          }
        }
    };

    return (
        <InputContainer>
           <StyledInput
                list='searchdatalist'
                onKeyPress={handleInputKeyPress}
                placeholder='Search for players or teams'
                onChange={(event) => { event.persist(); handleSearchChange(event); }}
            />
           <datalist id='searchdatalist'>
               {dataSet.map((d) => (
                 <option key={d.value}>{d.text}</option>
               ))}
            </datalist>
            <GoIcon visible={foundItem != null}>
                GO &rarr;
            </GoIcon>
        </InputContainer>
    );
};

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    font-variant: small-caps;
`;

const GoIcon = styled.div<{ visible: boolean}>`
    ${(props) => !props.visible && 'display: none;'}
    color: green;
    padding-left: 0.5em;
    border: 1px solid white;
    height: 1.5rem;
`;

const StyledInput = styled.input`
    background: #eee;
    border-radius: 5px;
    height: 1.5rem;
    width: 20rem;
`;
