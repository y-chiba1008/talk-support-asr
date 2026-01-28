import { Button, VStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { useReactMediaRecorder } from 'react-media-recorder';

type BtnStateus = 'waiting' | 'preparing' | 'recording' | 'requesting'

// デバッグ用
const waitSeconds = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

const AudioButton: React.FC = () => {
    const [btnStateus, setBtnStateus] = useState<BtnStateus>('waiting');

    const sendRequest = async (blob: Blob) => {
        // 具体的な実装は後で
        console.log('send request');
        await waitSeconds(3000);
    };

    const {
        status: audioStatus,
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({
        audio: true,
        onStart: () => {
            console.log('onStart');
            setBtnStateus('recording');
        },
        onStop: async (blobUrl, blob) => {
            console.log('onStop');
            setBtnStateus('requesting');
            await sendRequest(blob);
            setBtnStateus('waiting');
        },
    });

    const onClickWaiting = () => {
        setBtnStateus('preparing');
        startRecording();
    };

    const getButtonByStatus = (btnStateus: BtnStateus) => {
        switch (btnStateus) {
            case 'waiting':
                return (
                    <Button colorPalette={'teal'} onClick={onClickWaiting}>録音する<FaMicrophone /></Button>
                );
            case 'preparing':
                return (
                    <Button colorPalette={'teal'} loading loadingText='準備中...' spinnerPlacement='end'></Button>
                );
            case 'recording':
                return (
                    <Button colorPalette={'red'} onClick={stopRecording}>録音停止<FaMicrophoneSlash /></Button>
                );
            case 'requesting':
                return (
                    <Button colorPalette={'yellow'} loading loadingText='解析中...' spinnerPlacement='end'></Button>
                );
        }
    };

    return (
        <VStack>
            {getButtonByStatus(btnStateus)}
            {/* 以下はデバッグ用 */}
            <Text>audioStatus: {audioStatus}</Text>
            <Text>btnState: {btnStateus}</Text>
            <Text>mediaBlobUrl: {mediaBlobUrl}</Text>
            {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
        </VStack>
    );
};

export default AudioButton;