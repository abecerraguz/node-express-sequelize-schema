import axios from "axios";
import moment from 'moment';

const obtenerPacientes = async() =>{
    const salida = await axios.get('https://node-express-sequelize-schema-production.up.railway.app/api/pacientes/')
    return salida.data
}

export const vistaHome = (req,res)=>{
    obtenerPacientes()
        .then((result) => {
            const pacientes = result.proyectos
            const arr = []
            pacientes .forEach((element) => {
               
                const paciente = {
                    pk_idPaciente:element.pk_idPaciente,
                    nombre:element.nombre.toLowerCase(),
                    apellido:element.apellido,
                    sexo:element.sexo,
                    fechaNacimiento: moment(element.fechaNacimiento.toString()).locale('es-us').format('LL') ,
                    ciudad:element.ciudad,
                    estado:element.estado,
                    telefono:element.telefono
                }
                arr.push(paciente)
                
            })
            renderRespuesta( arr )
        })
    function renderRespuesta( pacientes ){
        res.render("home",{
            layout:"main",
            title:"Bienvenidos al Sistema de Administración Clinica Santa María",
            pacientes:pacientes
        })
    }
    
}

