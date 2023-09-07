import Paciente from '../models/Paciente.js';
import AgendarCita from '../models/AgendarCita.js';

// `SELECT * FROM categories order by category_id ASC;`
export const getPacientesNames = async(req,res) =>{
    const pacientes = await Paciente.findAll({
        order:[
            ['nombre', 'DESC'],
        ],
        attributes: ["nombre"]
    });
    res.json({pacientes: pacientes})
}

export const getPacientes = async(req,res) =>{
    const pacientes = await Paciente.findAll();
    res.json({pacientes: pacientes})
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
        const existeTelefono = await Paciente.findOne({
            where:{
                telefono:body.telefono
            }
        })

        if(existeTelefono){
            return res.status(409).json({
                msg:`Ya existe el telefono del paciente ${body.telefono }`
            })
        }

        const paciente = new Paciente(body)
        // console.log( 'paciente--->', paciente )
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
                msg:`No existe el paciente con el id ${id}`
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

export const deletePaciente = async (req,res) => {

    const { id } = req.params

    console.log('Salida del ID paciente-->', id )

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
export async function getEspecialistasCitasAgendadas(req,res) {
    // const { id } = req.params;
    try {

      const tareas = await AgendarCita.findAll({
        include: [{ model: Paciente   }]
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