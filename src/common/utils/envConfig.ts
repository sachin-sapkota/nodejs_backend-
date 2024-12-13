import dotenv from "dotenv";
import { cleanEnv, host, num, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
  HOST: host({ devDefault: testOnly("localhost") }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
  MONGO_URI: str({ devDefault: testOnly("mongodb://localhost:27017/test") }),
  REDIS_URL: str({ devDefault: testOnly("redis://localhost:6379") }),
  EMAIL_API_KEY: str({ devDefault: testOnly("re_KfnLSWaT_AhtZpBEBNdkjwBLCYtJ74ST2") }),
  EMAIL_SENDER: str({ devDefault: testOnly("onboarding@resend.dev") }),
  ACCESS_TOKEN_SECRET: str({ devDefault: testOnly("accesssecret") }),
  REFRESH_TOKEN_SECRET: str({ devDefault: testOnly("refreshsecret") }),
  VERIFICATION_TOKEN_SECRET: str({ devDefault: testOnly("verificationsecret") }),
  BASE_URL: str({ devDefault: testOnly("http://localhost:8090") }),
  LOGIN_TOKEN_SECRET: str({ devDefault: testOnly("loginsecret") }),
  FRONTEND_URL: str({ devDefault: testOnly("http://localhost:3000") }),
});
