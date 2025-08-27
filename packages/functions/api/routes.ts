import { Hono } from "hono";
import { logger } from "hono/logger";
import { NeighboorhoodEntity, SearchResults } from "../../core/types/response";
import { randomNeighboorhood } from "../../util/random";
import { SearchQuerySchema, SearchQueryType } from "../../core/types/request";
import { ZodError } from "zod";
import { Neighboordhood } from "../../core/neighboorhood";

export const app = new Hono();
app.use(logger()).use(async (c, next) => {
  c.header("Cache-Control", "no-store");
  return next();
});

app.get("/search", async (c) => {
  let parsed: SearchQueryType;
  try {
    const params = await c.req.param();
    parsed = SearchQuerySchema.parse(params);
    
  } catch (error) {
    if( error instanceof ZodError ) {
      return c.json({
        message: "Validation Error",
        errors: error.issues
      });
    }
  }

  const bestMatches = await Neighboordhood.searchForNeighboorhoods(parsed);
  const results: SearchResults = {bestMatches: bestMatches};

  return c.json(results);
});