import Paciente from '../models/Paciente.js';


export const getPacientes = async(req,res) =>{
    const pacientes = await Paciente.findAll();
    res.json({proyectos: pacientes})
}

export const getPaciente = async (req,res) =>{
    const {id} = req.params
    const pacientes = await Paciente.findByPk(id);
    if(pacientes){
        res.json(pacientes)
    }else{
        res.status(404).json({
            msg:`No existe el paciente con el id ${id}`
        })
    }
}

export const postPaciente = async (req,res) => {

   const { body } = req;

   try {
        const existePk_idPaciente = await Paciente.findOne({
                where:{
                    pk_idPaciente:body.pk_idPaciente
                }
        })

        if(existePk_idPaciente){
                return res.status(400).json({
                    msg:`Ya existe el id del paciente ${body.pk_idPaciente }`
                })
        }

        const paciente = new Paciente(body)
        await paciente.save();
        res.json(paciente)

   } catch (error) {
        res.status(500).json({
            msg:`${error}`
        })
   }
  

}

export const putPaciente = async (req,res) => {

    const { id } = req.params
    const { body } = req;

    try {
        const paciente = await Paciente.findByPk(id); 
        if(!paciente){
            return res.status(404).json({
                msg:`No existe el proyecto con el id ${id}`
            })
        }
        await paciente.update(body);
        res.json(paciente)

    } catch (error) {
        res.status(500).json({
            msg:'Se ha producido un error, comuniquese con el administrador'
        })
    }
}

export const deletePaciente = async (req,res) =>{
    const { id } = req.params
    
    const paciente = await Paciente.findByPk(id);

    if(!paciente){
        return res.status(404).json({
            msg:`No existe el proyecto con el id ${id}`
        })
    }
    await paciente.destroy();
    res.json(paciente)
}

// Obtiene todas las tereas de un proyecto
// export async function getProyectoTareas(req,res) {
//     const { id } = req.params;
//     try {

//       const tareas = await Tarea.findAll({
//         attributes: ["id", "proyectoId", "nombre", "estado"],
//         where: { proyectoId: id },
//       });
     
//       if(!tareas){
//         console.log('Mierda', tareas.length)
//         return res.status(404).json({
//             msg:`El proyecto no tiene asignada ninguna tarea`
//         })
//       }else{
//         res.json(tareas);
//       }
    
      
     

//     } catch (e) {
//       return res.status(500).json({ message: e.message });
//     }
//   }