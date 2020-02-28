import { Input, Label } from '@rebass/forms';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Flex, Text } from 'rebass';
import styled from 'styled-components';
import { doLogin } from '../state/thunks/LoginThunks';

export const Login: React.FC = () => {
    const [ { username, password }, setUser ] = useState({ username: '', password: ''});
    const dispatch = useDispatch();

    const login = (event: any) => {
        event.preventDefault();
        dispatch(doLogin(username, password));
    };

    return (
        <Flex
            justifyContent='center'
        >
            <Box
                bg='level1'
                p={4}
                as='form' onSubmit={login}
                marginTop={4}
                sx={{
                    borderRadius: '5px',
                }}
            >
                <Text as='h1' my={4}>NHL APP LOGIN</Text>
                <Box>
                    <Label my={1} htmlFor='username'>Username</Label>
                    <Input
                        id='username'
                        name='username'
                        value={username}
                        onChange={(event) => setUser({ username: event.target.value, password })} />
                </Box>
                <Box>
                    <Label my={1} htmlFor='password'>Password</Label>
                    <Input
                        id='password'
                        name='password'
                        type='password'
                        value={password}
                        onChange={(event) => setUser({ username, password: event.target.value })}
                    />
                </Box>
                <Button my={3} width='100%' role='submit'>Login</Button>
            </Box>
        </Flex>
    );
};

const LoginButton = styled.button`
    margin-top: 1em;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2em;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
`;
