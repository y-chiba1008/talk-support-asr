import { useRecorderStore } from '@/hooks/useRecorderStore';
import { useTranscriptStore } from '@/hooks/useTranscriptStore';
import { useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

export const RecorderManager = () => {
    const updateStatus = useRecorderStore((state) => state.updateStatus);
    const updateVolume = useRecorderStore((state) => state.updateVolume);
    const setControls = useRecorderStore((state) => state.setControls);
    const startTranscript = useTranscriptStore((state) => state.startTranscript);

    // mediaStream ではなく previewStream を取得します
    const {
        status,
        startRecording,
        stopRecording,
        previewAudioStream: stream
    } = useReactMediaRecorder({
        audio: true,

        // 録音停止時にblobを更新
        onStop: async (_blobUrl, blob) => {
            await startTranscript(blob);
        },
    });

    const n_tracks = stream?.getAudioTracks()?.length ?? 0;

    // 操作関数をStoreに同期
    useEffect(() => {
        setControls({ start: startRecording, stop: stopRecording });
    }, [startRecording, stopRecording, setControls]);

    // ステータスを同期
    useEffect(() => {
        updateStatus(status);
    }, [status, updateStatus]);

    // 音量解析ロジック
    useEffect(() => {
        // 録音中かつストリームが存在する場合のみ解析
        if (!stream || status !== 'recording') {
            updateVolume(0);
            return;
        }

        // オーディオトラックが有効かどうかの厳密なチェックを追加
        const audioTracks = stream.getAudioTracks();
        if (audioTracks.length === 0 || audioTracks[0].readyState !== 'live') {
            // トラックがまだ準備できていない場合は何もしない（次のレンダリングを待つ）
            return;
        }

        const audioContext = new AudioContext();
        // 念のため、初期化直後に suspend 状態なら resume する（ブラウザ対策）
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        const source = audioContext.createMediaStreamSource(stream);
        const analyzer = audioContext.createAnalyser();

        analyzer.fftSize = 256;
        source.connect(analyzer);

        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        let animationId: number;

        const reportVolume = () => {
            analyzer.getByteFrequencyData(dataArray);
            const sum = dataArray.reduce((a, b) => a + b, 0);
            const average = sum / bufferLength;
            // 最大値を255から100に調整
            const normalizedVolume = Math.round((average / 255) * 100);

            // Zustandの更新
            updateVolume(normalizedVolume);

            animationId = requestAnimationFrame(reportVolume);
        };

        reportVolume();

        return () => {
            cancelAnimationFrame(animationId);
            // audioContextをクローズ
            if (audioContext.state !== 'closed') {
                audioContext.close();
            }
        };
    }, [stream, n_tracks, status, updateVolume]);

    return null;
}