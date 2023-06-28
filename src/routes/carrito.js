import express from 'express';
// llamo al controller
import { agregarArticulo } from '../controllers/carritoController.js';

const router = express.Router();

router.post('/', agregarArticulo);

export default router;
