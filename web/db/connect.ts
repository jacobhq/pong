import * as schema from './schema';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import {createPool} from '@vercel/postgres';

const pool = createPool({
    connectionString: process.env.DB_POSTGRES_URL,
});

export const db = drizzle(pool, { schema });
