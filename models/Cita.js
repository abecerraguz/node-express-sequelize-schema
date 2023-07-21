import { DataTypes } from 'sequelize';
import db from '../db/connection.js';
import AgendarCita from './AgendarCita.js'

const Cita = db.define('cita',{

    pk_idCita:{
        type:DataTypes.CHAR(7),
        primaryKey:true,
        allowNull: false,
        validate: {
            pk_idCita(value) {
              if (!value.match(/[CM]{2}[-]{1}\d{4}$/)) {
                throw new Error('El ID de la cita no coincide con el formato esperado CM-0000.');
              }
            }
          }
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull: false,
    },
    hora:{
        type:DataTypes.TIME,
        allowNull: false,
    } 
},
{
    timestamps:false
}
)
export default Cita;

// RELACION 1 es A 1 desde Cita a Agendar Cita
// 1. Establece la asociación en uno de los modelos ( por ejemplo, en Usuario ):
    // Cada usuario "tiene un" perfil asociado (hasOne ---> "Tiene un")
Cita.hasOne( AgendarCita, {
      foreignKey: 'fk_idCita', // clave foránea en el modelo Perfil
      as: 'cita' // nombre de la propiedad en el modelo Cita para acceder al perfil asociado
});
  
// 2. Establece la asociación inversa en el otro modelo (Profile):
     // El modelo Perfil "pertenece a" un usuario ( belongsTo ---> "Pertenece a" )
AgendarCita.belongsTo( Cita, {
      foreignKey: 'fk_idCita' // clave foránea en el modelo Cita
  });


