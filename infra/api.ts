import { database } from "./database";

export const apiFn = new sst.aws.Function("ApiFn", {
  handler: "./packages/functions/api/index.handler",
  environment: {
    SUPABASE_URL: "lerysglodrppsgdoucqm.supabase.co"
  },
  permissions:[
        {
            actions: ["ssm:GetParameter","kms:Decrypt"],
            resources: [
              `arn:aws:ssm:*:*:parameter/supabase/password`,
            ]
        }
    ],
  url: true,
});