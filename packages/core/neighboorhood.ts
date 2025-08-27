import { SearchQueryType } from "./types/request";
import { NeighboorhoodEntity } from "./types/response";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const { AWS_REGION, NEIGHBOORHOODS_TABLE } = process.env;

const client = new DynamoDBClient({
  region: AWS_REGION,
});

const documentClient = DynamoDBDocument.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export namespace Neighboordhood {
    /**
     * Search through neighboorhod with fields to filer results down to relevant neighboorhoods
     * @param request {SearchQueryType}
     */
    export const searchForNeighboorhoods = async (request: SearchQueryType): Promise<NeighboorhoodEntity[]> => {
        try {
            const scanParams = {
                TableName: NEIGHBOORHOODS_TABLE || "NeighboordhoodTable",
            };

            const result = await documentClient.scan(scanParams);
            
            if (!result.Items) {
                return [];
            }

            let neighborhoods = result.Items as any[];

            if (request.incomeLow !== undefined) {
                neighborhoods = neighborhoods.filter(n => n.median_income >= request.incomeLow!);
            }

            if (request.incomeHigh !== undefined) {
                neighborhoods = neighborhoods.filter(n => n.median_income <= request.incomeHigh!);
            }

            // Sort by median_income in ascending order and return first 3
            neighborhoods.sort((a, b) => a.median_income - b.median_income);
            return neighborhoods.slice(0, 3);
        } catch (error) {
            console.error('Error searching neighborhoods:', error);
            throw error;
        }
    };
}
