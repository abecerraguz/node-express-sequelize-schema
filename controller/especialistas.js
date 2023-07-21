import Especialista from '../models/Especialista.js';



export const getEspecialistas = async(req,res) =>{
    const especialistas = await Especialista.findAll();
    res.json({proyectos: especialistas})
}

export const getEspecialista = async (req,res) =>{
    const {id} = req.params
    const especialistas = await Especialista.findByPk(id);
    if(especialistas){
        res.json(especialistas)
    }else{
        res.status(404).json({
            msg:`No existe el especialista con el id ${id}`
        })
    }
}

export const postEspecialista = async (req,res) => {

   const { body } = req;

   try {
        const existePk_idEspecialista = await Especialista.findOne({
                where:{
                    pk_idEspecialista:body.pk_idEspecialista
                }
        })

        if(existePk_idEspecialista){
                return res.status(400).json({
                    msg:`Ya existe el id del especialista ${body.pk_idPaciente }`
                })
        }

        const especialista = new Especialista(body)
        await especialista.save();
        res.json(especialista)

   } catch (error) {
        res.status(500).json({
            msg:`${error}`
        })
   }
  

}

export const putEspecialista = async (req,res) => {

    const { id } = req.params
    const { body } = req;

    try {
        const especialista = await Especialista.findByPk(id); 
        if(!especialista){
            return res.status(404).json({
                msg:`No existe el proyecto con el id ${id}`
            })
        }
        await especialista.update(body);
        res.json(especialista)

    } catch (error) {
        res.status(500).json({
            msg:'Se ha producido un error, comuniquese con el administrador'
        })
    }
}

export const deleteEspecialista = async (req,res) =>{
    const { id } = req.params
    
    const especialista = await Especialista.findByPk(id);

    if(!especialista){
        return res.status(404).json({
            msg:`No existe el proyecto con el id ${id}`
        })
    }
    await especialista.destroy();
    res.json(especialista)
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