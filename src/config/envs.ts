import 'dotenv/config';
import * as joi from 'joi';

interface Env {
  NATS_SERVER_URL: string;
  RMQ_SERVER_URL: string;
  RMQ_QUEUE: string;
  DB_URL: string;
  AWS_REGION: string;
  SECRET_ACCESS_KEY: string;
  ACCES_KEY_ID: string;
  JWT_SECRET: string;
}
const envsSchema = joi
  .object({
    NATS_SERVER_URL: joi.string().required(),
    RMQ_SERVER_URL: joi.string().required(),
    RMQ_QUEUE: joi.string().required(),
    DB_URL: joi.string().required(),
    AWS_REGION: joi.string().required(),
    SECRET_ACCESS_KEY: joi.string().required(),
    ACCES_KEY_ID: joi.string().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const envs = value as Env;
