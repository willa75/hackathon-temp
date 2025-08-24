import { char, pgTable, primaryKey, text, timestamp, uniqueIndex, varchar, integer} from "drizzle-orm/pg-core";

export const ulid = (name: string) => char(name, { length: 26 + 4 });


export const areaDemographicsTable = pgTable("area_demographics", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    zipCode: varchar("zipCode", {length: 10}).notNull(),
    countyFips: varchar("county_fips", {length: 5}).notNull(), // county_fips is the country code for census
    totalPopulation: integer("total_population").notNull(),
    medianIncome: integer("median_income").default(0),
    medianRent: integer("median_rent").default(0),
    laborForce: integer("labor_force").default(0),
    unemployed: integer("unemployed").default(0),
    bachelorDegreeHolders: integer("bachelor_degree_holders").default(0),
    masterDegreeHodlers: integer("masters_degree_holders").default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});
