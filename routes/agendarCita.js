import express from 'express';

import {
    getAgendarCitas,
    getAgendarCita,
    postAgendarCita,
    putAgendarCita,
    deleteAgendarCita
} from '../controller/agendarCitas.js';

const router = express.Router();

router.get( '/', getAgendarCitas );
router.get( '/:id', getAgendarCita );
router.post( '/', postAgendarCita );
router.put( '/:id', putAgendarCita );
router.delete( '/:id', deleteAgendarCita );

export default router;
