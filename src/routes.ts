import { Router } from "https://deno.land/x/oak/mod.ts";
import { ifNoneMatchResponse } from "./lib/httpUtils.ts";

const books = new Map<string, { id: string; title: string; author: string }>();
books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Arthur",
});

export const router = new Router();
router
  .get("/api", (context) => {
    ifNoneMatchResponse(context, JSON.stringify(Array.from(books.values())));
  })
  .get("/api/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      ifNoneMatchResponse(context, JSON.stringify(books.get(context.params.id)));
    }
  });
