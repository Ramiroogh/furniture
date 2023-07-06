
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
