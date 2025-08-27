import { neighboorhoodDemographicTable } from "./database";

export const apiFn = new sst.aws.Function("ApiFn", {
  handler: "./packages/functions/api/index.handler",
  environment: {
    NEIGHBOORHOODS_TABLE: neighboorhoodDemographicTable.name
  },
  permissions:[
        {
            effect: "allow",
            actions: ["ssm:GetParameter","kms:Decrypt"],
            resources: [
              `arn:aws:ssm:*:*:parameter/supabase/password`,
            ]
        },
        {
          effect: "allow",
          actions: ["dynamodb:Scan"],
          resources: [
            neighboorhoodDemographicTable.arn
          ]
        }
    ],
  url: true,
});