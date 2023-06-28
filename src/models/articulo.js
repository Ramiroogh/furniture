// Importa la biblioteca de Mongoose
const mongoose = require('mongoose');

// Define el esquema para el modelo "Articulo"
const articuloSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

// Crea el modelo "Articulo" utilizando el esquema definido
const Articulo = mongoose.model('Articulo', articuloSchema);

// Exporta el modelo para que esté disponible en otros archivos
module.exports = Articulo;
