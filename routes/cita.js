import express from 'express';

import {
    getCitas,
    getCita,
    postCita,
    putCita,
    deleteCita,
    getCitasAgendadas
} from '../controller/citas.js';

const router = express.Router();

//   ( / == "/api/citas/get-citas-agendadas")

router.get( '/', getCitas );
router.get( '/get-citas-agendadas', getCitasAgendadas );
router.get( '/:id', getCita );
router.post( '/', postCita );
router.put( '/:id', putCita );
router.delete( '/:id', deleteCita );

export default router;
