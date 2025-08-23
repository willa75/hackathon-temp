import { apiFn } from "./api";

export const frontend = new sst.aws.Nextjs("BatmanFrontend", {
    environment: {
        URL: apiFn.url
    },
    path: "./packages/frontend/"
});