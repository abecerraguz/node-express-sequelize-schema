import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

const Cita = db.define('agendar_citas',{

    // fk_idCita:{
    //     type:DataTypes.CHAR(7),
    //     primaryKey:true,
    //     allowNull: false,
    //     validate: {
    //         fk_idCita(value) {
    //           if (!value.match(/^[CM]{2}[-]{1}\d{4}$/)) {
    //             throw new Error('El ID de la cita no coincide con el formato esperado CM-0000.');
    //           }
    //         }
    //       }
    // },
    // fk_idEspecialista:{
    //     type:DataTypes.CHAR(7),
    //     primaryKey:true,
    //     allowNull: false,
    //     validate: {
    //         fk_idEspecialista(value) {
    //           if (!value.match(/^[ME]{2}[-]{1}\d{4}$/)) {
    //             throw new Error('El ID de la cita no coincide con el formato esperado CM-0000.');
    //           }
    //         }
    //       }
    // },
    consultario:{
        type:DataTypes.STRING(20),
        allowNull: false,
    },
    fechaCita:{
        type:DataTypes.DATE,
        allowNull: false,
    },
    horaCita:{
        type:DataTypes.TIME,
        allowNull: false,
    },
    turno:{
        type:DataTypes.STRING(10),
        allowNull: false,
    },
    status:{
        type:DataTypes.STRING(10),
        allowNull: false,
    },
    observaciones:{
        type:DataTypes.STRING(100),
        allowNull: false,
    },
},
{
    timestamps:false
}
)
export default Cita;


