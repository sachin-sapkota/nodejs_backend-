import { env } from "@/common/utils/envConfig";
import { app, logger } from "@/server";
import { connectDB } from "./common/config/db";
import { connectRedis } from "./common/config/redis";
const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

(async () => {
    await connectDB();
    await connectRedis();
  
  })();

