import axios from "axios";
import moment from 'moment';

const obtenerEspecialistas = async () => {
    const salida = await axios.get(  process.env.HOSTLOCAL ? `${process.env.HOSTLOCAL}/api/especialistas`: `${process.env.HOSTPRODUCCION}/api/especialistas` )
    return salida.data
}

export const vistaEspecialista = (req,res) => {
    obtenerEspecialistas()
        .then((result) => {
            const especialistas = result.especialistas
            const arr = []
            especialistas.forEach((element) => {
                const especialista = {
                    pk_idEspecialista:element.pk_idEspecialista,
                    nombre:element.nombre,
                    apellido:element.apellido,
                    sexo:element.sexo,
                    fechaNacimiento: moment(element.fechaNacimiento.toString()).locale('es-us').format('LL') ,
                    especialidad:element.especialidad
                }
                arr.push(especialista)
            })
            console.log( 'Especialistas--->',  arr )
            renderRespuesta( arr )
        })
    function renderRespuesta( especialistas ){

        res.render("especialistas",{
            layout:"main",
            title:"Bienvenidos al Sistema de Administración Clinica Santa María",
            especialistas:especialistas
        })
    }
    
}

