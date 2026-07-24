import { env } from '#root/utils/env.js';

export const aiConfig = {
    serverIP: env('AI_SERVER_IP') || 'localhost',
    serverPort: env('AI_SERVER_PORT') || 9017,
    proxyAddress: env('AI_PROXY_ADDRESS') || 'socks5h://localhost:1055',
    MINIMAX_API_KEY: env('MINIMAX_API_KEY') || null,
    MINIMAX_MODEL: env('MINIMAX_MODEL') || null,
    MINIMAX_BASE_URL: env('MINIMAX_BASE_URL') || 'https://api.minimax.chat/v1'
};
