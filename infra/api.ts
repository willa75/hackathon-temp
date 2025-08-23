import { database } from "./database";

export const apiFn = new sst.aws.Function("ApiFn", {
  handler: "./packages/functions/api/index.handler",
  link: [
    database,
  ],
  url: true,
});