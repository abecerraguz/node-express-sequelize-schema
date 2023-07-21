import dotenv from 'dotenv';
import Server from './models/Server.js';

// Esto es para que funcione la ruta haca el .env
dotenv.config();


const server = new Server();
server.initHandelbars();
server.listen();