import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// CONEXION BASE DE DATOS
const db = new Sequelize( process.env.PGDATABASELOCAL || process.env.PGDATABASE , process.env.PGUSERLOCAL || process.env.PGUSER, process.env.PGPASSWORDLOCAL || process.env.PGPASSWORD , {
    host:process.env.PGHOSTLOCAL || process.env.PGHOST,
    port: process.env.PGPORTLOCAL || process.env.PGPORT,
    dialect:'postgres'
});

export default db


