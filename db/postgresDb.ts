import 'pg';
const pg = require('pg');

export const client =  new pg.Pool({
                        host: 'localhost',
                        user: 'postgres',
                        password: '****',
                        database: 'postgres',
                        port: 5432,
                        max: 5,
                    });