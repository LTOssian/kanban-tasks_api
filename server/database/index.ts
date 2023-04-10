import {createPool} from 'mysql2';
import * as dotenv from 'dotenv'
import { Database } from '../interfaces/interfaces';
import { Kysely, MysqlDialect  } from 'kysely'

dotenv.config();


export const promisePool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();

export const db = new Kysely<Database>({
    dialect: new MysqlDialect({
        pool: createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
    })
})
