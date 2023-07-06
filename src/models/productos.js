// MODELO
import express from 'express'
import mongoose from 'mongoose';

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
    cantidad: {
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

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;
