import * as joi from 'joi';

if (process.env.NODE_ENV !== 'production') {
    const path = require('path');
    const dotenv = require('dotenv');
    const envFilePath = path.resolve(process.cwd(), 'apps/api-gateway/deploy/.env');
    dotenv.config({ path: envFilePath });
}

interface EnvVars {
    PORT: number;
    
    // // Usuarios
    // USUARIOS_TCP_PORT: number;
    // USUARIOS_HOST: string;
    
    // // Clientes
    // CLIENTES_TCP_PORT: number;
    // CLIENTES_HOST: string;

    // // Productos
    // PRODUCTOS_TCP_PORT: number;
    // PRODUCTOS_HOST: string;

    DATABASE_URL?: string; // Opcional porque el Gateway no la usa
    NATS_SERVERS: string[];
}

const envsSchema = joi.object({
    PORT: joi.number().required(),

    NATS_SERVERS: joi.array().items(joi.string()).required(),
    
    // Validamos DATABASE_URL solo si existe (para no romper el Gateway)
    DATABASE_URL: joi.string().optional(),
    
    // // Validaciones Usuarios
    // USUARIOS_TCP_PORT: joi.number().required(),
    // USUARIOS_HOST: joi.string().required(),

    // // Validaciones Clientes
    // CLIENTES_TCP_PORT: joi.number().required(),
    // CLIENTES_HOST: joi.string().required(),

    // // Validaciones Productos
    // PRODUCTOS_TCP_PORT: joi.number().required(),
    // PRODUCTOS_HOST: joi.string().required(),
})
.unknown(true);
const { error, value } = envsSchema.validate({ ...process.env, NATS_SERVERS: process.env.NATS_SERVERS?.split(','), });

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
    natsServers: envVars.NATS_SERVERS,
    // usuarios: {
    //     host: envVars.USUARIOS_HOST,
    //     port: envVars.USUARIOS_TCP_PORT,
    // },
    // clientes: {
    //     host: envVars.CLIENTES_HOST,
    //     port: envVars.CLIENTES_TCP_PORT,
    // },
    // productos: {
    //     host: envVars.PRODUCTOS_HOST,
    //     port: envVars.PRODUCTOS_TCP_PORT,
    // },
};