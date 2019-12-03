import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
        <LoginContainer>
            <form onSubmit={login}>
                <InputContainer>
                    <Label>Username</Label>
                    <Input value={username} onChange={(event) => setUser({ username: event.target.value, password })} />
                </InputContainer>
                <InputContainer>
                    <Label>Password</Label>
                    <Input type='password' value={password} onChange={(event) => setUser({ username, password: event.target.value })} />
                </InputContainer>
                <LoginButton role='submit'>Login</LoginButton>
            </form>
        </LoginContainer>
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

const Label = styled.div`

`;

const Input = styled.input`

`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
`;
