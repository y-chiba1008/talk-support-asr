import { Button, VStack, Text } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { useReactMediaRecorder } from 'react-media-recorder';

/** ボタン制御用のステータス */
type AppStatus = 'idle' | 'requesting'

/** ボタン設定値オブジェクト */
interface Config {
    label: string;
    color: string;
    loading?: boolean;
    icon?: React.ReactNode;
    onClick?: () => void;
}

// デバッグ用
const waitSeconds = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

/**
 * @summary 録音ボタン
 * @description 録音停止時にapiにリクエストを送信する
*/
const AudioButton: React.FC = () => {
    const [appStatus, setAppStatus] = useState<AppStatus>('idle');

    const sendRequest = async (blob: Blob) => {
        // 具体的な実装は後で
        console.log('send request');
        await waitSeconds(3000);
    };

    // 録音機能Hook
    const {
        status: audioStatus,
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({
        audio: true,
        onStop: async (_blobUrl, blob) => {
            console.log('onStop');
            setAppStatus('requesting');
            try {
                await sendRequest(blob);
            } finally {
                setAppStatus('idle');
            }
        },
    });

    // 表示内容の整理
    const buttonConfig: Config = useMemo(() => {
        if (appStatus === 'requesting') {
            // API応答待ち
            return {
                label: '解析中...',
                color: 'yellow',
                loading: true,
            };
        } else if (audioStatus === 'acquiring_media') {
            // オーディオ起動待ち
            return {
                label: '準備中...',
                color: 'teal',
                loading: true,
            };
        } else if (audioStatus === 'recording') {
            // 録音中
            return {
                label: '録音停止',
                color: 'red',
                icon: <FaMicrophoneSlash />,
                onClick: stopRecording,
            };
        } else {
            // 録音開始待ち
            return {
                label: '録音する',
                color: 'teal',
                icon: <FaMicrophone />,
                onClick: startRecording,
            };
        }
    }, [appStatus, audioStatus, startRecording, stopRecording]);

    return (
        <VStack>
            <Button
                colorPalette={buttonConfig.color}
                onClick={buttonConfig.onClick}
                loading={buttonConfig.loading}
                loadingText={buttonConfig.label}
                spinnerPlacement="end"
            >
                {buttonConfig.label} {buttonConfig.icon}
            </Button>
            {/* 以下はデバッグ用 */}
            <Text>audioStatus: {audioStatus}</Text>
            <Text>btnState: {appStatus}</Text>
            <Text>mediaBlobUrl: {mediaBlobUrl}</Text>
            {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
        </VStack>
    );
};

export default AudioButton;