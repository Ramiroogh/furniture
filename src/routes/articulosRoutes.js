import express from 'express';
import Producto from '../models/productos.js';

const router = express.Router();


router.get('/articulos', async (req, res) => {
  try {
    const productos = await Producto.find({}).exec();
    console.log(productos);
    res.render('pages/articulos/index.ejs', { productos: productos });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Error al obtener los productos');
  }
});

export default router;