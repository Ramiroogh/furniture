// Importar los módulos necesarios
import mongoose from 'mongoose';

// Conectar con la base de datos MongoDB
mongoose.connect('mongodb+srv://edu5800:SM7kUDFZ7eO7aSrf@cluster0.xz6yusr.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

// Definir el modelo de la colección "productos" en MongoDB
const productoSchema = new mongoose.Schema({
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
const productos = mongoose.model('productos', productoSchema);

const nuevoProducto = {
    nombre: 'Ejemplo de producto',
    categoria: 'Ejemplo',
    precio: 10,
    descripcion: 'Este es un ejemplo de producto',
    url: 'https://ejemplo.com'
  };

// Realizar la consulta para buscar propiedades
try {
    const creado = await productos.create(nuevoProducto);
  console.log('Documento creado:', creado);

    // Realizar la consulta para buscar el documento recién creado
    const productoEncontrado = await productos.findOne({ _id: creado._id });
    if (productoEncontrado) {
      console.log('Propiedades del producto encontrado:', Object.keys(productoEncontrado));
    } else {
      console.log('No se encontró el producto recién creado');
    }
  } catch (error) {
    console.error('Error al crear o buscar el producto:', error);
  }

// Cerrar la conexión con la base de datos
await mongoose.disconnect();
