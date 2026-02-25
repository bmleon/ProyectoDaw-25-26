import 'dotenv/config';
import * as joi from 'joi';

if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config({ path: 'apps/ms-usuarios/deploy/.env' });
}

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  NATS_SERVERS: string[];
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  
  // Validamos que sea un array de strings
  NATS_SERVERS: joi.array().items(joi.string()).required(),
})
.unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  jwtSecret: envVars.JWT_SECRET,
  natsServers: envVars.NATS_SERVERS,
};