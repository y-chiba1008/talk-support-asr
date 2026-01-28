import { Button, AbsoluteCenter, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

interface Result {
    Hello: string,
    Status: string,
};

const FetchTest: React.FC = () => {
    const [result, setResult] = useState<Result | null>(null);

    const send_request = async () => {
        try {
            const res = await fetch('http://localhost:8000');
            const result = await res.json();
            setResult(result);
        } catch (error) {
            console.error(error);
            setResult({
                Hello: '[NO DATA]',
                Status: '[NO DATA]',
            });
        }
    };

    return (
        <AbsoluteCenter>
            <VStack>
                <Button onClick={send_request}>送信</Button>
                <Text>Hello: {result?.Hello ?? '[NO DATA]'}</Text>
                <Text>Status: {result?.Status ?? '[NO DATA]'}</Text>
            </VStack>
        </AbsoluteCenter>
    );
};
export default FetchTest;