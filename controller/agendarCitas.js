import AgendarCita from '../models/AgendarCita.js';
import Especialista from '../models/Especialista.js';


export const getAgendarCitas = async(req,res) =>{
    const agendarCitas = await AgendarCita.findAll();
    res.json({proyectos: agendarCitas})
}

export const getAgendarCita = async (req,res) =>{
    const {id} = req.params
    const agendarCitas = await AgendarCita.findByPk(id);
    if(agendarCitas){
        res.json(agendarCitas)
    }else{
        res.status(404).json({
            msg:`No existe la cita con el id ${id}`
        })
    }
}

export const postAgendarCita = async (req,res) => {

   const { body } = req;

   console.log('postAgendarCita-->', body.fk_idCita)

   try {


        const existefk_idCita = await AgendarCita.findOne({
            where:{
                fk_idCita:body.fk_idCita
            }
        })

        if(existefk_idCita){
            return res.status(400).json({
                msg:`Ya existe el id de la cita ${body.existefk_idCita }`
            })
        }

        const cita = new AgendarCita(body)
        await cita.save();
        res.json(cita)

   } catch (error) {
        res.status(500).json({
            msg:`${error}`
        })
   }

  

}

export const putAgendarCita = async (req,res) => {

    const { id } = req.params
    const { body } = req;

    try {
        const cita = await AgendarCita.findByPk(id); 
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

export const deleteAgendarCita = async (req,res) =>{
    const { id } = req.params
    const cita = await AgendarCita.findByPk(id);

    if(!cita){
        return res.status(404).json({
            msg:`No existe el proyecto con el id ${id}`
        })
    }
    await cita.destroy();
    res.json(cita)
}


