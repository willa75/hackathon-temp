import { z } from "zod";

export const SearchQuerySchema = z.object({
    incomeLow: z.number().optional(),
    incomeHigh: z.number().optional(),
    zipCode: z.string().optional(),
    houseHoldCountLow: z.number(),
    houseHoldCountHigh: z.number().optional(),
    ageLow: z.number().optional(),
    ageHigh: z.number().optional(),
});

export type SearchQueryType = z.infer<typeof SearchQuerySchema>;