import express from 'express';
import { vistaEspecialista } from '../controller/vistaEspecialista.js';

const router = express.Router();

router.get( '/', vistaEspecialista );

export default router;