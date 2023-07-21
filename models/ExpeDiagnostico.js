import { DataTypes } from 'sequelize';
import db from '../db/connection.js';


const ExpeDiagnostico = db.define('expediente_diagnostico',{
    serial:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
    },
    // fk_idEspecialista:{
    //     type:DataTypes.CHAR(7),
    //     foreignKey:true,
    //     allowNull: false,
    //     validate: {
    //         fk_idEspecialista(value) {
    //           if (!value.match(/^[ME]{2}[-]{1}\d{4}$/)) {
    //             throw new Error('El ID de la cita no coincide con el formato esperado CM-0000.');
    //           }
    //         }
    //       }
    // },
    // pk_idPaciente:{
    //     type:DataTypes.CHAR(6),
    //     foreignKey:true,
    //     allowNull: false,
    //     validate: {
    //         pk_idPaciente(value) {
    //           if (!value.match(/^[P]{1}[-]{1}\d{4}$/)) {
    //             throw new Error('El ID del paciente no coincide con el formato esperado P-0000.');
    //           }
    //         }
    //       }
    // },
    edad:{
        type:DataTypes.CHAR(3),
        allowNull: false,
    },
    peso:{
        type:DataTypes.CHAR(3),
        allowNull: false,
    },
    altura:{
        type:DataTypes.CHAR(4),
        allowNull: false,
    },
    IMC:{
        type:DataTypes.CHAR(5),
        allowNull: false,
    },
    nivelPeso:{
        type:DataTypes.CHAR(10),
        allowNull: false,
    },
    presionArterial:{
        type:DataTypes.CHAR(8),
        allowNull: false,
    },
    diagnostico:{
        type:DataTypes.STRING(150),
        allowNull: false,
    },
    recetario:{
        type:DataTypes.STRING(150),
        allowNull: false,
    },
    fechaCreacion:{
        type:DataTypes.DATE,
        allowNull: false,
    }
},
{
    timestamps:false
}
)
export default ExpeDiagnostico;





