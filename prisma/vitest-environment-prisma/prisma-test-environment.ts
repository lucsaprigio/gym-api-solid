import 'dotenv/config';

import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';
import type { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// postgresql://docker:docker@localhost:5432/apisolid?schema=public

function generateDatabaseURL(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL');
    }

    const url = new URL(process.env.DATABASE_URL);

    url.searchParams.set('schema', schema);

    execSync('npx prisma migrate deploy'); // Deploy - pula a etapa de confirmação

    return url.toString();
}

export default <Environment><unknown>{
    name: 'prisma',
    async setup() {
        const schema = randomUUID();

        const databaseURL = generateDatabaseURL(schema);

        process.env.DATABASE_URL = databaseURL;



        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
            }
        }
    },
    transformMode: 'ssr' // Adicionando a propriedade transformMode

}