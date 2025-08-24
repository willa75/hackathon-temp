import { drizzle } from "drizzle-orm/postgres-js";  
import postgres = require("postgres");  
import { getParameter } from "@aws-lambda-powertools/parameters/ssm";

const { SUPABASE_URL } = process.env;

let db: ReturnType<typeof drizzle> | null = null;

export const getDb = async () => {
    if (db) return db;

    const supabasePassword = await getParameter("/supabase/password", {
        maxAge: 300,
        decrypt: true,
    }) as unknown as string;

    const client = postgres(`postgresql://postgres:${supabasePassword}@${SUPABASE_URL}:5432/postgres`);

    db = drizzle(client, {
        logger: 
            process.env.DRIZZLE_LOG === "true"
                ?   {
                        logQuery(query, params) {
                            console.log("Drizzle query", {query});
                            console.log("Drizzle params", {params});
                        },
                    }
                : undefined
    });

    return db;
};
