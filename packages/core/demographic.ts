import { and, gte, lte, eq } from "drizzle-orm";
import { SearchQueryType } from "./types/request";
import { getDb } from "./db";
import { areaDemographicsTable } from "./db/schema";

export namespace Demographic {
    export const searchRecords = async (search: SearchQueryType) => {
        const conditions = [];

        if (search.zipCode !== undefined && search.zipCode !== null) {
            conditions.push(eq(areaDemographicsTable.zipCode, search.zipCode));
        }

        if (search.incomeLow !== undefined && search.incomeLow !== null) {
            conditions.push(gte(areaDemographicsTable.medianIncome, search.incomeLow));
        }

        if (search.incomeHigh !== undefined && search.incomeHigh !== null) {
            conditions.push(lte(areaDemographicsTable.medianIncome, search.incomeHigh));
        }

        if (search.ageLow !== undefined && search.ageLow !== null) {
            conditions.push(gte(areaDemographicsTable.totalPopulation, search.ageLow));
        }

        if (search.ageHigh !== undefined && search.ageHigh !== null) {
            conditions.push(lte(areaDemographicsTable.totalPopulation, search.ageHigh));
        }

        if (search.houseHoldCountLow !== undefined && search.houseHoldCountLow !== null) {
            conditions.push(gte(areaDemographicsTable.totalPopulation, search.houseHoldCountLow));
        }

        if (search.houseHoldCountHigh !== undefined && search.houseHoldCountHigh !== null) {
            conditions.push(lte(areaDemographicsTable.totalPopulation, search.houseHoldCountHigh));
        }

        const db = await getDb();
        return await db
            .select()
            .from(areaDemographicsTable)
            .where(conditions.length > 0 ? and(...conditions) : undefined);
    };
};
