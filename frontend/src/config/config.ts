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

const api_protocol = getEnv('VITE_API_PROTOCOl');
const api_domain = getEnv('VITE_API_DOMAIN');

/** API関連設定 */
export const CONFIG = {
    API_PROTOCOl: api_protocol,
    API_DOMAIN: api_domain,
    API_BASE_URL: `${api_protocol}://${api_domain}`,
} as const;