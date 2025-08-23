import { app } from "./routes";
import { handle, streamHandle } from "hono/aws-lambda";

// export type Routes = typeof routes;
export const handler = handle(app);