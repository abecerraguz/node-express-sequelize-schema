import express from 'express';
import db from '../db/connection.js';
import pacienteRoutes from '../routes/paciente.js';
import especialistaRoutes from '../routes/especialista.js';
import expedienteRoutes from '../routes/expediente.js';
import citaRoutes from '../routes/cita.js';
import agendarCitasRoutes from '../routes/agendarCita.js';
import citasEspecialista from '../routes/citasEspecialista.js'

// Importamos nuestro Motor de plantilla
import { create } from 'express-handlebars';
import vistaHome from '../routes/vistaHome.routes.js';
import vistaPacientes from '../routes/vistaPacientes.routes.js';
import vistaEspecialista from '../routes/vistaEspecialistas.routes.js';


// Creación de variables de entorno
import { fileURLToPath } from 'url'
import { dirname } from "path";

const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )



class Server {

    constructor(){
        
        this.app = express();
        this.port = process.env.PORT || 8000 ;

        this.apiPaths = {

            // Rutas para la API Back End
            pacientes:'/api/pacientes',
            especialistas:'/api/especialistas',
            expedientes:'/api/expedientes',
            citas:'/api/citas',
            citasEspecialistas:'/api/citas_especialistas',
            agendar_citas:'/api/agendar_citas',


            // Rutas para el Front End
            rootHome:'/',
            rootPacientes:'/pacientes',
            rootEspecialidades:'/especialistas'
        }

        // Métodos inicialess
        this.dbConnection();
        this.middlewares();
        this.routes();
    
    }

    async dbConnection(){
        
        try {
            // Metodo para verificar si me logr autentificar 
            // correctamente en la base de datos
            // await db.authenticate()

            /*
                https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization
                
                Método sync()
                Sincronisa los modelos que son mis tablas
                User.sync() - Esto crea la tabla si no existe (y no hace nada si ya existe)
                User.sync({ force: true })- Esto crea la tabla, soltándola primero si ya existía
                User.sync({ alter: true })- Esto verifica cuál es el estado actual de la tabla en la base de datos (qué columnas tiene, cuáles son sus tipos de datos, etc.), y luego realiza los cambios necesarios en la tabla para que coincida con el modelo.
            */

            // await db.authenticate()
            await db.sync({ force:true })
            console.log('Database arriba')
        } catch (error) {
            throw new Error(error)
        }
    }

    middlewares(){
        
        this.app.use( express.json() );
        this.app.use( express.static('public') );
        
        this.app.use('/bootstrapjs',express.static(  `${__dirname}/../node_modules/bootstrap/dist/js`  ));
        this.app.use('/bootstrap',express.static( `${__dirname}/../node_modules/bootstrap/dist/css`));
        this.app.use('/bootstrapicons',express.static( `${__dirname}/../node_modules/bootstrap-icons/font`));
        this.app.use('/css',express.static( `${__dirname}/../public/assets/css`));
        this.app.use('/img',express.static( `${__dirname}/../public/assets/img`));
        this.app.use('/js',express.static( `${__dirname}/../public/assets/js`));
        this.app.use('/sweetalert2',express.static( `${__dirname}/../node_modules/sweetalert2/dist`));
        this.app.use('/axios',express.static( `${__dirname}/../node_modules/axios/dist`));
        this.app.use('/moment',express.static( `${__dirname}/../node_modules/moment/dist`));

    }

    routes(){
        // Rutas a las distintas API del Backend
        this.app.use( this.apiPaths.pacientes , pacienteRoutes );
        this.app.use( this.apiPaths.especialistas , especialistaRoutes );
        this.app.use( this.apiPaths.expedientes , expedienteRoutes );
        this.app.use( this.apiPaths.citas , citaRoutes );
        this.app.use( this.apiPaths.agendar_citas , agendarCitasRoutes );

        this.app.use( this.apiPaths.citasEspecialistas, citasEspecialista );

        this.app.use( this.apiPaths.rootHome, vistaHome );
        this.app.use( this.apiPaths.rootPacientes, vistaPacientes );
        this.app.use( this.apiPaths.rootEspecialidades, vistaEspecialista );
    }

  
    listen(){
        this.app.listen( this.port,()=>{
            console.log(`Servidor corriendo en puerto ${this.port}`)
        })
    }

    initHandelbars(){
   
        this.hbs = create({
            partialsDir:[
                "views/"
            ]
        });
        
        this.app.engine( "handlebars", this.hbs.engine );
        this.app.set("view engine","handlebars");

    }
}
export default Server;