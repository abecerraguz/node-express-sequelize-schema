import { DataTypes } from 'sequelize';
import db from './../db/connection.js';
import AgendarCita from './AgendarCita.js';
import ExpeDiagnostico from './ExpeDiagnostico.js';

const Especialista = db.define('especialista',{

    pk_idEspecialista:{
        type:DataTypes.CHAR(7),
        primaryKey:true,
        allowNull: false,
        validate: {
            pk_idEspecialista(value) {
              if (!value.match(/^[ME]{2}[-]{1}\d{4}$/)) {
                throw new Error('El ID del especialista no coincide con el formato esperado P-0000.');
              }
            }
          }
    },
    nombre:{
        type:DataTypes.STRING(20),
        allowNull: false,
    },
    apellido:{
        type:DataTypes.STRING(20),
        allowNull: false,
    },
    sexo:{
        type:DataTypes.CHAR(1),
        allowNull: false,
    },
    fechaNacimiento:{
        type:DataTypes.DATE,
        allowNull: false,
    },
    especialidad:{
        type:DataTypes.STRING(30),
        allowNull: false
    }
},
{
    timestamps:false
}
)
export default Especialista;

// RELACION ESPECIALISTA TIENE MUCHAS CITAS AGENDADAS
//  1. Establece la asociación en uno de los modelos (por ejemplo, en User):
    // Cada usuario "tiene muchas" publicaciones  (hasMany ---> Tiene Muchas )
Especialista.hasMany( AgendarCita, {
    foreignKey: 'fk_idEspecialista', // clave foránea en el modelo Post
    //as: 'fk_idEspecialista', // nombre de la propiedad en el modelo User para acceder a los posts asociados
    onDelete: 'CASCADE', // Establecer la opción de cascada para eliminar
    onUpdate: 'CASCADE', // Establecer la opción de cascada para actualizar
});

// 2. Establece la asociación inversa en el otro modelo (Publicacion):
// El modelo Publicación "pertenece a" un usuario ( belongsTo ---> "Tiene un" )
AgendarCita.belongsTo( Especialista, {
    foreignKey: 'fk_idEspecialista' // clave foránea en el modelo Publicacion
});


// RELACION ESPECIALISTA TIENE MUCHOS EXPEDIENTES DIAGNOSTCOS
Especialista.hasMany( ExpeDiagnostico, {
    foreignKey: 'fk_idEspecialista', // clave foránea en el modelo Post
    as: 'expedienteDiagnostico' // nombre de la propiedad en el modelo User para acceder a los posts asociados
});

ExpeDiagnostico.belongsTo( Especialista, {
    foreignKey: 'fk_idEspecialista' // clave foránea en el modelo Publicacion
});













