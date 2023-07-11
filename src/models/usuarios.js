import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    email: String,
    usuario: String,
    contraseña: String,
    es_admin: { type: Boolean, default: false },
    fecha_reg: { type: Date, default: Date.now }
}, { collection: 'usuarios' });

const User = mongoose.model('User', userSchema);

export default User;