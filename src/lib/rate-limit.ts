// Simple in-memory rate limiter for a single Node process.
// WARNING: Not suitable for distributed serverless environments (use Redis/Upstash instead).
// Safe for local / single-container deployment.

interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

const store: Record<string, RateLimitStore> = {
  "default": {},
  "expensive": {},
  "email": {}
};

export function rateLimit(ip: string, actionType: "default" | "expensive" | "email", limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = store[actionType];
  
  if (!bucket[ip]) {
    bucket[ip] = {
      count: 1,
      resetTime: now + windowMs
    };
    return { success: true };
  }

  const record = bucket[ip];

  if (now > record.resetTime) {
    // Window expired, reset
    record.count = 1;
    record.resetTime = now + windowMs;
    return { success: true };
  }

  if (record.count >= limit) {
    return { success: false, resetTime: record.resetTime };
  }

  record.count++;
  return { success: true };
}
