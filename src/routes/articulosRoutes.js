import express from 'express';
import Producto from '../models/productos.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const { categoria, busqueda } = req.query;
    let query = {};

    if (categoria) {
      const regex = new RegExp(categoria, 'i');
      query.categoria = regex;
    }

    if (busqueda) {
      const regex = new RegExp(busqueda, 'i');
      query.$or = [
        { nombre: regex },
        { categoria: regex }
      ];
    }

    const productos = await Producto.find(query).exec();
    const valorBusqueda = busqueda || '';

    res.render('pages/articulos/index.ejs', { productos, valorBusqueda });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Error al obtener los productos');
  }
});

router.get('/descripcion/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id).exec();
    res.render('pages/articulos/descripcion.ejs', { producto });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).send('Error al obtener el producto');
  }
});

export default router;