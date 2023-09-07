import Cita from '../models/Cita.js';
import AgendarCita from '../models/AgendarCita.js';
import Especialista from '../models/Especialista.js';

export const getCitas = async(req,res) =>{
    const citas = await Cita.findAll();
    res.json({citas: citas})
}

export const getCita = async (req,res) =>{
    const {id} = req.params
    const citas = await Cita.findByPk(id);
    if(citas){
        res.json(citas)
    }else{
        res.status(404).json({
            msg:`No existe la cita con el id ${id}`
        })
    }
}

export const postCita = async (req,res) => {

   const { body } = req;

    try {
        const existePk_idCita = await Cita.findOne({
                where:{
                    pk_idCita:body.pk_idCita
                }
        })

        if(existePk_idCita){
                return res.status(400).json({
                    msg:`Ya existe el id de la cita ${body.pk_idCita }`
                })
        }

        const cita = new Cita(body)
        // console.log('Salida de cita--->',cita)
        await cita.save();
        res.json(cita)

    } catch (error) {
        res.status(500).json({
            msg:`${error}`
        })
    }
  

}

export const putCita = async (req,res) => {

    const { id } = req.params
    const { body } = req;

    try {
        const cita = await Cita.findByPk(id); 
        if(!cita){
            return res.status(404).json({
                msg:`No existe el proyecto con el id ${id}`
            })
        }
        await cita.update(body);
        res.json(cita)

    } catch (error) {
        res.status(500).json({
            msg:'Se ha producido un error, comuniquese con el administrador'
        })
    }
}

export const deleteCita = async (req,res) =>{
    const { id } = req.params
    
    const cita = await Cita.findByPk(id);

    if(!cita){
        return res.status(404).json({
            msg:`No existe el proyecto con el id ${id}`
        })
    }
    await cita.destroy();
    res.json(cita)
}


// Obtiene todas las tereas de un proyecto
export async function getCitasAgendadas(req,res) {
    // const { id } = req.params;
    try {

      const tareas = await Cita.findAll({
        include: [{ model:  AgendarCita  }],
        // attributes: ["id", "proyectoId", "nombre", "estado"],
        // where: { proyectoId: id },
      });

        if(!tareas){
            console.log('Mierda', tareas.length)
            return res.status(404).json({
                msg:`El proyecto no tiene asignada ninguna tarea`
            })
        }else{
            res.json(tareas);
        }
   
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
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