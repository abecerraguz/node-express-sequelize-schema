import express from 'express';
import { vistaPaciente } from '../controller/vistaPaciente.js';

const router = express.Router();

router.get( '/', vistaPaciente );

export default router;