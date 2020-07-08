import { Application } from "https://deno.land/x/oak/mod.ts";
import { router } from "./routes.ts";
import { HTTP_PORT } from "./env.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}/api`
  );
});
await app.listen({ port: HTTP_PORT });
