import mongoose from 'mongoose';

const pagoSchema = new mongoose.Schema({
    nombre: { type: String },
    apellido: { type: String },
    numeroTarjeta: { type: Number },
    cvv: { type: Number },
    fechaVencimiento: { type: String },
    fecha_pago: { type: Date, default: Date.now },
    montoTotal: { type: Number },
    articulos: { type: Array }
}, { collection: 'pagos' });
const Pago = mongoose.model('pagos', pagoSchema);
export default Pago;