import express from 'express';
import {
    getPacientes,
    getPacientesNames,
    getPaciente,
    postPaciente,
    putPaciente,
    deletePaciente
} from '../controller/pacientes.js';

const router = express.Router();

router.get( '/', getPacientes );
router.get( '/names', getPacientesNames );
router.get( '/:id', getPaciente );
router.post( '/', postPaciente );
router.put( '/:id', putPaciente );
router.delete( '/:id', deletePaciente );

export default router;
