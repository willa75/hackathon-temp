import { Hono } from "hono";
import { logger } from "hono/logger";

export const app = new Hono();
app.use(logger()).use(async (c, next) => {
  c.header("Cache-Control", "no-store");
  return next();
});

// export const routes = app.get("/search", {
//     zval
// });
