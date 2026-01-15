import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

/**
 * Upstash + Redis rate limiter
 * - Uses sliding window: 10 requests per 20 seconds
 * - Exports `rateLimiter` Express middleware
 *
 * Requires env vars:
 *  - UPSTASH_REDIS_REST_URL
 *  - UPSTASH_REDIS_REST_TOKEN
 */
dotenv.config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '10 s'),
});

// export const rateLimiter = async (req, res, next) => {
//   const key = req.ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.connection?.remoteAddress || 'global';

//   try {
//     const { success, pending, limit, remaining, reset } = await ratelimit.limit(key);

//     // Helpful headers for clients
//     if (limit !== undefined) res.setHeader('X-RateLimit-Limit', limit);
//     if (remaining !== undefined) res.setHeader('X-RateLimit-Remaining', remaining);
//     if (reset !== undefined) res.setHeader('X-RateLimit-Reset', reset);

//     if (!success) {
//       // If rate limited, respond 429
//       return res.status(429).json({ message: 'Too many requests, please try again later.' });
//     }

//     // If there's a pending promise (for example for sliding-window correction), await it
//     if (pending) await pending;

//     return next();
//   } catch (err) {
//     console.error('Rate limiter error:', err);
//     // Fail open: do not block requests if rate limiter is down
//     return next();
//   }
// };

export default ratelimit;
