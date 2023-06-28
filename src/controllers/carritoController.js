import Articulo from '../models/articulo.js';

export const agregarArticulo = async (req, res) => {
  try {
    const { id } = req.body;
    const articulo = await Articulo.findById(id);
    res.render('carrito', { articulo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al agregar el artículo al carrito' });
  }
};

// carritoController.js

// Variable para almacenar los artículos del carrito
let carrito = [];

export const agregarArticulo = (req, res) => {
  // Obtén los datos del artículo desde el cuerpo de la solicitud
  const { nombre, precio, descripcion } = req.body;

  // Crea un nuevo objeto de artículo con los datos recibidos
  const nuevoArticulo = {
    nombre,
    precio,
    descripcion
  };

  // Agrega el nuevo artículo al carrito
  carrito.push(nuevoArticulo);

  // Envía la respuesta con el estado actualizado del carrito
  res.status(200).json({ carrito });
};
