import { createClient } from 'redis';
const redisClient = createClient({

    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-15419.crce281.ap-south-1-3.ec2.cloud.redislabs.com',
        port: 15419
    }
});

export default redisClient
