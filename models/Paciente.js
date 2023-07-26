import { DataTypes } from 'sequelize';
import db from './../db/connection.js';
import Expediente from './Expediente.js';
import Cita from './Cita.js'

const Paciente = db.define('paciente',{

    pk_idPaciente:{
        type:DataTypes.CHAR(6),
        primaryKey:true,
        allowNull: false,
        validate: {
            pk_idPaciente(value) {
              if (!value.match(/^[P]{1}[-]{1}\d{4}$/)) {
                throw new Error('El ID del paciente no coincide con el formato esperado P-0000.');
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
    ciudad:{
        type:DataTypes.STRING(20),
        allowNull: false
    },
    estado:{
        type:DataTypes.STRING(20),
        allowNull: false
    },
    telefono:{
        type:DataTypes.CHAR(12),
        unique:true
    }
},
{
    timestamps:false
}
)
export default Paciente;

// INICIO RELACION 1 es a 1 
Paciente.hasOne( Expediente, {
    foreignKey: 'pk_idPaciente', // clave foránea en el modelo Expediente
    as: 'expediente', // nombre de la propiedad en el modelo User para acceder a los posts asociados
    onDelete: 'CASCADE', // Establecer la opción de cascada para eliminar
    onUpdate: 'CASCADE', // Establecer la opción de cascada para actualizar
});


Expediente.belongsTo( Paciente, {
    foreignKey: 'pk_idPaciente' // clave foránea en el modelo Publicacion
});
// CIERRE RELACION 1 es a 1 


// INICIO Relación uno es a muchos 
Paciente.hasMany( Cita, {
    foreignKey: 'fk_idPaciente',
    as: 'cita',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Cita.belongsTo( Paciente, {
    foreignKey: 'fk_idPaciente'
});
// // CIERRE Relación uno es a muchos 
