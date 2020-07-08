import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

export const HTTP_PORT = env.HTTP_PORT ? parseInt(env.HTTP_PORT, 10) : 8080;
