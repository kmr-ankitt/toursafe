import { createClient, RedisClientType } from 'redis';

let client: RedisClientType;

export async function getRedisClient(): Promise<RedisClientType> {
  if (!client) {
    // Create redis client
    client = createClient();

    client.on('error', (err: Error) => {
      console.error('Redis Client Error:', err);
    });

    await client.connect();
  }
  return client;
}