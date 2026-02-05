/**
 * 環境変数のバリデーション（存在確認）
 */
const getEnv = (key: string): string => {
    console.log(`getEnv: ${key}`);
    const value = import.meta.env[key];

    // 未設定の場合、コンソールにエラー出力
    if (!value) {
        const message = `[Environment Error]: ${key} is not defined in .env file.`;
        console.error(message);
        throw new Error(message);
    }

    return value;
};

/** API関連設定 */
export const API_CONFIG = {
    ENDPOINT: getEnv('VITE_API_ENDPOINT'),
} as const;