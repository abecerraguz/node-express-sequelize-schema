import express from 'express';
import {
    getEspecialistas,
    getEspecialista,
    postEspecialista,
    putEspecialista,
    deleteEspecialista
} from '../controller/especialistas.js';

const router = express.Router();

router.get( '/', getEspecialistas );
router.get( '/:id', getEspecialista );
router.post( '/', postEspecialista );
router.put( '/:id', putEspecialista );
router.delete( '/:id', deleteEspecialista );

export default router;
