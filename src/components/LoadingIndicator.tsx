import React from 'react';
import { Flex } from 'rebass';
import { PulseLoader } from 'react-spinners';

interface LoadingIndicatorProps {

}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = () => {

    return (
        <Flex height='100%' flexDirection='column' alignItems='center' justifyContent='center' ><PulseLoader size={20} /></Flex>
    );
};
