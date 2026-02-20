import { useRecorderStore } from '@/hooks/useRecorderStore';
import { Progress } from '@chakra-ui/react';
import { useEffect } from 'react';

const VolumeBar = () => {
    const volume = useRecorderStore((state) => state.volume);
    useEffect(() => {
        console.log(`volueme: ${volume}`);
    }, [volume])

    // 音量に応じた色の変更
    const getColor = (v: number) => {
        if (v > 80) return 'red';
        if (v > 50) return 'yellow';
        return 'green';
    };

    return (
        <Progress.Root
            defaultValue={0}
            value={volume}
            colorPalette={getColor(volume)}
            size='xs'
        >
            <Progress.Track>
                <Progress.Range />
            </Progress.Track>
        </Progress.Root>
    );
};

export default VolumeBar;