import { Sequelize } from 'sequelize';


const db = new Sequelize('Clinica_Postgres', 'postgres', 'postgres', {
    host:'localhost',
    dialect:'postgres',
    logging:true
});

export default db

