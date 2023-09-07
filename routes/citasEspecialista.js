import express from 'express';
import {
    getCitasEspecialistas,
    getEspecialistasCitasAgendadas
} from '../controller/especialistas.js';

const router = express.Router();

router.post( '/:id', getCitasEspecialistas );
router.get( '/',  getEspecialistasCitasAgendadas );


export default router;