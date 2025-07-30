import Redis, { RedisOptions } from "ioredis";

// The config variable is defined but never used
const config: RedisOptions = {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};

// Redis connection information is hardcoded
// Very bad security/configuration practice
// Impossible to deploy in different environments (dev/prod)
const connection = new Redis({
  host: "localhost", // ❌ Hardcoded - should come from .env
  port: 6379, // ❌ Hardcoded - should come from .env
});
// No connection error handling
// If Redis is down, the app will crash without useful info
// No retry system in case of failure

export const getRedisConnection = () => connection;
export default connection;
