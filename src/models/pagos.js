import mongoose from 'mongoose';

const pagoSchema = new mongoose.Schema({
    nombre: {
        type: String,
    },
    apellido: {
        type: String,
    },
    numeroTarjeta: {
        type: Number,
    },
    cvv: {
        type: Number,
    },
    fechaVencimiento: {
        type: String,
    },
    fecha: {
        type: Number,
    },
    montoTotal: {
        type: Number,
    },
    articulos: {
        type: String,
    }
});
const Pago = mongoose.model('pagos',pagoSchema);
export default Pago;