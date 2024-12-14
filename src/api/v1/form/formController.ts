import { redisClient } from '../../../common/config/redis';
const SESSION_EXPIRY = 60 * 60 * 24 * 5; //5 days expiry for redis


const getOrCreateSession = async (email: string) => {
    const sessionKey = `${email}:FormData`;
    const existingSession = await redisClient.get(sessionKey);

    if (!existingSession) {
        const newSession = {};
        await redisClient.set(sessionKey, JSON.stringify(newSession), { EX: SESSION_EXPIRY });
        return newSession;
    }

    return JSON.parse(existingSession);
};



export const saveToSession = async (email: string, key: string, data: any) => {
    const sessionKey = `${email}:FormData`;
    const session = await getOrCreateSession(email);
    session[key] = data;
    await redisClient.set(sessionKey, JSON.stringify(session), { EX: SESSION_EXPIRY });
};




