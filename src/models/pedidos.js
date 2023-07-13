import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
    id_producto: String,
    id_usuario: String,
    esta_pago: { type: Boolean, default: false },
}, { collection: 'pedidos' });

const Pedidos = mongoose.model('Pedidos', pedidoSchema);

export default Pedidos;