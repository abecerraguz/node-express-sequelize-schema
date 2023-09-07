import axios from "axios";
import moment from 'moment';

const obtenerPacientes = async () => {
    const salida = await axios.get(  process.env.HOSTLOCAL ? `${process.env.HOSTLOCAL}/api/pacientes`: `${process.env.HOSTPRODUCCION}/api/pacientes` )
    return salida.data
}

const quitarEspacios = info => info.trim();

export const vistaPaciente = (req,res) => {
    obtenerPacientes()
        .then((result) => {
            const pacientes = result.pacientes
            const arr = []
            pacientes.forEach((element) => {
               
                const paciente = {

                    pk_idPaciente:element.pk_idPaciente,
                    nombre:quitarEspacios(element.nombre),
                    apellido:quitarEspacios(element.apellido),
                    sexo:element.sexo,
                    fechaNacimiento: moment(element.fechaNacimiento.toString()).locale('es-us').format('LL') ,
                    region:element.region,
                    ciudad:quitarEspacios(element.ciudad),
                    telefono:quitarEspacios(element.telefono),
                    estado:element.estado
                }
                arr.push(paciente)
                
            })
            renderRespuesta(  arr, true  )
       
          
        })
        
    
    function renderRespuesta( pacientes,result ){
        res.render("pacientes",{
            layout:"main",
            title:"Bienvenidos al Sistema de Administración Clinica Santa María",
            pacientes:pacientes,
            estado:pacientes.estado,
            expedientes:false
            // expedientes:obtenerExpedientes().then( result => result.expedientes ).catch( err => console.log(err))
        })
    }
    
}

