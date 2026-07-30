import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load .env if it exists
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Load .env.local if it exists (takes precedence)
const localEnvPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath, override: true });
}

import { defineConfig } from '@prisma/config';

let dbUrl = process.env.DATABASE_URL || "";

if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
  // Prevent silent fallbacks or missing URLs in production/build environments
  if (!dbUrl || (!dbUrl.startsWith("postgresql://") && !dbUrl.startsWith("postgres://"))) {
    throw new Error(
      "CRITICAL: A valid PostgreSQL DATABASE_URL is required. " +
      "The current URL is either missing or invalid. Do NOT use 'file:./dev.db' for PostgreSQL. " +
      "Please set a valid connection string starting with 'postgresql://' or 'postgres://' in your environment."
    );
  }
} else {
  // Local development fallback warning (still prevents SQLite strings if PostgreSQL is the provider)
  if (dbUrl.startsWith("file:")) {
     throw new Error(
      "CRITICAL: The current DATABASE_URL is pointing to a SQLite file ('" + dbUrl + "'), " +
      "but the schema requires PostgreSQL. Please update your local .env to use a valid PostgreSQL URL."
    );
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: dbUrl,
  }
});
