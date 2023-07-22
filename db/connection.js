import { Sequelize } from 'sequelize';

// DB LOCAL
// const db = new Sequelize('Clinica_Postgres', 'postgres', 'postgres', {
//     host:'localhost',
//     dialect:'postgres',
//     logging:true
// });

// DB PRODUCCION
const db = new Sequelize( process.env.DATABASE_URL )

export default db

