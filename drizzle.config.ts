import { defineConfig } from "drizzle-kit";

const { SUPABASE_URL, SUPABASE_PASSWORD } = process.env;

export default defineConfig({
  strict: true,
  verbose: true,
  out: "./packages/core/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://postgres:${SUPABASE_PASSWORD}@${SUPABASE_URL}:5432/postgres`
  },
  schema: "./packages/core/db/schema.ts",
});
