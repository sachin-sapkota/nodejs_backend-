import type { Request } from "express";
import { rateLimit } from "express-rate-limit";

import { env } from "@/common/utils/envConfig";

const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: 20,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  windowMs: 60 * 1000, // 1 minute
  keyGenerator: (req: Request) => req.ip as string,
});

export default rateLimiter;
