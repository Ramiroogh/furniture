import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import articulosRoutes from './src/routes/articulosRoutes.js';


// Parsear solicitudes HTTP de formularios
import bodyParser from 'body-parser';

// ODM - MongoDB
import mongoose from 'mongoose';
// Modelo
import Producto from './src/models/productos.js'

// Variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// Modales de Alerta
import flash from 'connect-flash';

// Middleware Manejo de Sesiones
import session from 'express-session';
import passport from 'passport';

import MethodOverride from 'method-override';
import morgan from 'morgan';

// Routes
import carritoRoutes from './src/routes/carrito.js';

// Instancia de la Aplicación - Entrypoint
const app = express();


//mostraria resultado de las peticiones en la consola o terminal
app.use(morgan('dev'))

//sirve para los formularios envio de informacion al node js
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

// Obtener la ruta del directorio actual
const currentDir = dirname(fileURLToPath(import.meta.url));

//motor de plantilla
app.set('views', path.join(currentDir, 'views'));
app.set('view engine', 'ejs');

// Middleware, enlace a carpeta Public
app.use(express.static('public'))




// routes
app.use('/articulos', articulosRoutes);


// VERBOS HTTP
app.get('/', (req, res) => {
    res.render('pages/index.ejs')
})
app.get('/articulos', (req, res) => {
    res.render('pages/articulos/index.ejs');
});
app.get('/descripcion', (req,res) => {
    res.render('pages/articulo_descripcion/index.ejs');
})


// app.use('/carrito', carritoRoutes);

app.get('/favoritos', (req, res) => {
    res.render('pages/users/favoritos.ejs')
})

app.get('/compras', (req, res) => {
    res.render('pages/users/compras.ejs')
})

app.get('/usuarios', (req, res) => {
    res.render('pages/users/usuarios.ejs')
})

const items = [
    {
      image: "photo",
      title: "Producto 1",
      price: 10.99
    },
    {
      image: "https://m.media-amazon.com/images/I/71RoNsV1jDL._AC_SX522_.jpg",
      title: "Producto 2",
      price: 19.99
    },
    {
        image: "photo",
        title: "Producto 3",
        price: 19.99
      }
  ];

// Carrito
app.get('/carrito', (req,res) => {
    res.render('pages/carrito/index.ejs', { items })
})

// Ruta para mostrar el formulario de pago
app.get('/payment', (req, res) => {
    res.render('paymentForm');
});




// Conexión a la base de datos usando Mongoose

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });


// Ruta para mostrar el formulario de alta de productos
app.get('/agregarProductos', (req, res) => {
    res.render('pages/admin/agregarProductos');
});

// Ruta para procesar el formulario y guardar el producto en la base de datos
app.post('/agregarProductos', (req, res) => {
    const { nombre, categoria, precio, cantidad, descripcion, url } = req.body;

    const producto = new Producto({
        nombre,
        categoria,
        precio,
        cantidad,
        descripcion,
        url,
    });

    producto.save()
        .then(() => {
            console.log('Producto guardado exitosamente');
            res.redirect('/agregarProductos');
        })
        .catch((error) => {
            console.error('Error al guardar el producto:', error);
            res.redirect('/agregarProductos');
        });
});
// Server initialitation
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Se esta ejecutando el servidor en el puerto ${PORT}`)
})