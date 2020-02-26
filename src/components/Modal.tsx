import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export const Modal: React.FC<{open: boolean, onClose: () => void }> = ({ children, open, onClose }) => (
    open ? ReactDOM.createPortal(
        <>
            <BackDropContainer onClick={onClose} />
            <ModalContainer>
                <ModalCloseButton onClick={onClose} >X</ModalCloseButton>
                {children}
            </ModalContainer>
        </>,
        document.getElementById('modal') as HTMLElement,
    ) : null
);

const BackDropContainer = styled.div`
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0);
    backdrop-filter: blur(2px);
    position: absolute;
    top: 0;
    right: 0;
`;

const ModalContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    max-width: 300px;
    max-height: 300px;
    background: var(--semi-dark-gray);
    padding-top: 1em;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    border-radius: 3px;
`;

const ModalCloseButton = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    background: var(--semi-dark-gray);
    transition: all .2s ease-in;
    border: none;
    cursor: pointer;
    &:hover {
        background: var(--semi-light-gray);
        transform: scale(1.3);
    }
`;
