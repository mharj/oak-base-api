import { Context } from "https://deno.land/x/oak/mod.ts";
import { etag } from "https://deno.land/x/opine/src/utils/etag.ts";

export const ifNoneMatchResponse = (
  ctx: Context,
  data: typeof ctx.response.body
): void => {
    // no ETag for empty response
  if (data === undefined) {
    ctx.response.status = 200;
    ctx.response.body = data;
    return;
  }
  const tag = etag(JSON.stringify(data), {});
  if (getIfNoneMatch(ctx) === tag) {
    ctx.response.status = 304;
  } else {
    ctx.response.headers.set("ETag", tag);
    ctx.response.headers.set("Content-type", "application/json");
    ctx.response.body = data;
  }
};

const getIfNoneMatch = (ctx: Context): string | undefined => {
  return ctx.request.headers.get("if-none-match") || undefined;
};
