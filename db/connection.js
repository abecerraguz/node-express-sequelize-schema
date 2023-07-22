import { Sequelize } from 'sequelize';

// DB LOCAL
// const db = new Sequelize( process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
//     host:process.env.PGHOST,
//     dialect:'postgres'
// });

// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//   });

// DB PRODUCCION
const db = new Sequelize( process.env.DATABASE_URL )

export default db

