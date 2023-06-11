import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import flash from 'connect-flash'
import session from 'express-session'
import MethodOverride from 'method-override'
import passport from 'passport'
import morgan from 'morgan'

const app = express()


//mostraria resultado de las peticiones en la consola o terminal
app.use(morgan('dev'))

//sirve para los formularios envio de informacion al node js
app.use(bodyParser.urlencoded({ extended: true }))

//motor de plantilla
app.set('view engine', 'ejs')

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('pages/index.ejs')
})

// Obtener la ruta del directorio actual
const currentDir = dirname(fileURLToPath(import.meta.url));

//motor de plantilla
app.set('views', path.join(currentDir, 'views'));
app.set('view engine', 'ejs');

// folder public - en teoria es un middleware
app.use(express.static('public'))

// routes
app.get('/articulos', (req, res) => {
    res.render('pages/articulos/index');
});



app.get('/favoritos', (req, res) => {
    res.render('pages/favoritos.ejs')
})


app.get('/compras', (req, res) => {
    res.render('pages/compras.ejs')
})


app.get('/usuarios', (req, res) => {
    res.render('pages/usuarios.ejs')
})





app.listen(3030, () => {
    console.log(`Se esta ejecutando el servidor en el puerto 3030`)
})

