// MODELO
import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        
    },
    categoria: {
        type: String,
        
    },
    precio: {
        type: Number,
        
    },
    cantidad: {
        type: Number,
        
    },
    descripcion: {
        type: String,
        
    },
    url: {
        type: String,
        
    }
});

const Producto = mongoose.model('productos', productoSchema);

export default Producto;
