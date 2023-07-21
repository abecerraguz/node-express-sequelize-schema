import express from 'express';
import {
    getTareas,
    getTarea,
    postTarea,
    putTarea,
    deleteTarea
} from '../controller/tareas.js';

const router = express.Router();

router.get( '/', getTareas );
router.get( '/:id', getTarea );
router.post( '/', postTarea );
router.put( '/:id', putTarea );
router.delete( '/:id', deleteTarea );

export default router;
