import { Sequelize } from 'sequelize';

const db = new Sequelize('railway', 'postgres', 'rdy26b7VypqC27Dm6Z6M', {
    host:'containers-us-west-83.railway.app',
    dialect:'postgres',
    logging:true
});
// PGPASSWORD=rdy26b7VypqC27Dm6Z6M psql -h containers-us-west-83.railway.app -U postgres -p 7439 -d railway
// const db = new Sequelize( process.env.DATABASE_URL )

export default db

