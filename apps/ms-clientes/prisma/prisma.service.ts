import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma-client/ms-clientes';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { envs } from '../config'; 

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        const connectionString = envs.databaseUrl;
        const pool = new Pool({ connectionString });
        const adapter = new PrismaPg(pool);
        
        super({ adapter } as any);
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}