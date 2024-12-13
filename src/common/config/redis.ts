import { env } from '@/common/utils/envConfig';
const {REDIS_URL} = env
import { createClient } from 'redis'

export const redisClient = createClient({
    url: REDIS_URL
})
redisClient.on('error', (err) => console.error('Redis Client Error', err));

export const connectRedis = async (): Promise<void> => {
  await redisClient.connect();
  console.log('Redis connected successfully');
};
