import { useTranscriptStore } from '@/hooks/useTranscriptStore';
import { Button } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { useReactMediaRecorder } from 'react-media-recorder';

/** ボタン設定値オブジェクト */
interface Config {
    label: string;
    color: string;
    loading?: boolean;
    icon?: React.ReactNode;
    onClick?: () => void;
}

/**
 * 録音ボタン
 * @description 録音停止時にapiにリクエストを送信する
*/
const AudioButton: React.FC = () => {
    const transcriptStatus = useTranscriptStore((state) => state.transcriptStatus);
    const startTranscript = useTranscriptStore((state) => state.startTranscript);

    // 録音機能Hook
    const {
        status: audioStatus,
        startRecording,
        stopRecording,
    } = useReactMediaRecorder({
        audio: true,

        // 録音停止コールバック
        onStop: async (_blobUrl, blob) => {
            console.log('onStop');
            await startTranscript(blob)
        },
    });

    // 表示内容の整理
    const buttonConfig: Config = useMemo(() => {
        if (transcriptStatus === 'in_progress') {
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
    }, [transcriptStatus, audioStatus, startRecording, stopRecording]);

    return (
        <Button
            colorPalette={buttonConfig.color}
            onClick={buttonConfig.onClick}
            loading={buttonConfig.loading}
            loadingText={buttonConfig.label}
            spinnerPlacement="end"
        >
            {buttonConfig.label} {buttonConfig.icon}
        </Button>
    );
};

export default AudioButton;