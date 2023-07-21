import express from 'express';
import {
    getProyectos,
    getProyecto,
    postProyecto,
    putProyecto,
    deleteProyecto,
    getProyectoTareas
} from '../controller/proyectos.js';

const router = express.Router();

router.get( '/', getProyectos );
router.get( '/:id', getProyecto );
router.post( '/', postProyecto );
router.put( '/:id', putProyecto );
router.delete( '/:id', deleteProyecto );
router.get( "/:id/tareas", getProyectoTareas );

export default router;
