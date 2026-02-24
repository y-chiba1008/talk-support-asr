import { useRecorderStore } from '@/hooks/useRecorderStore';
import { useTranscriptStore } from '@/hooks/useTranscriptStore';
import { Button, type ButtonProps } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

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
const AudioButton = ({ children, ...btnProps }: ButtonProps) => {
    const audioStatus = useRecorderStore((state) => state.status);
    const startRecording = useRecorderStore((state) => state.start);
    const stopRecording = useRecorderStore((state) => state.stop);
    const transcriptStatus = useTranscriptStore((state) => state.transcriptStatus);

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
            {...btnProps}
        >
            {children || <>{buttonConfig.label} {buttonConfig.icon}</>}
        </Button>
    );
};

export default AudioButton;