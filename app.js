import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import articulosRoutes from './src/routes/articulosRoutes.js';
import User from './src/models/usuarios.js';


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
import { Strategy as LocalStrategy } from 'passport-local';
import morgan from 'morgan';

// Routes
import carritoRoutes from './src/routes/carrito.js';

// Instancia de la Aplicación - Entrypoint
const app = express();

app.use(flash());
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


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: 'iapepe',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Configuracion Passport
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ usuario: username })
            .exec()
            .then((user) => {
                if (!user) {
                    return done(null, false);
                }
                if (password !== user.contraseña) {
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch((err) => {
                return done(err);
            });
    })
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .exec()
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(err);
        });
});




// routes
app.use('/articulos', articulosRoutes);


// VERBOS HTTP
app.get('/', (req, res) => {
    res.render('pages/index.ejs')
})
// app.get('/articulos', (req, res) => {
//     res.render('pages/articulos/index.ejs');

// });
app.get('/descripcion', (req, res) => {
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

app.get('/QuienesSomos', (req, res) => {
    res.render('pages/articulos/QuienesSomos.ejs')
})

app.get('/contacto', (req, res) => {
    res.render('pages/users/contacto.ejs')
})


app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al destruir la sesión:', err);
        }
        res.redirect('/');
    });
});


app.get('/carrito', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user; // Accede al objeto de usuario autenticado
        res.render('pages/carrito/index.ejs', { user });
    } else {
        res.redirect('/login');
    }
});


app.get('/perfil', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user; // Accede al objeto de usuario autenticado
        res.render('pages/users/perfil.ejs', { user });
    } else {
        res.redirect('/login');
    }
});

app.get('/quienesSomos', (req, res) => {
    res.render('pages/articulos/QuienesSomos.ejs')
})

// Ruta para mostrar el formulario de pago
app.get('/payment', (req, res) => {
    res.render('paymentForm');
});


// Ruta para mostrar el formulario de pago
app.get('/payment', (req, res) => {
    res.render('paymentForm');
});


app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user; // Accede al objeto de usuario autenticado
        res.render('pages/users/perfil.ejs', { user });
    } else {
        res.render('pages/users/login.ejs');
    }
});

app.get('/register', (req, res) => {
    res.render('pages/users/register.ejs', {
        message: ''
    })
})

app.get('/registerOK', (req, res) => {
    res.render('pages/users/registerOK.ejs')
})


app.post('/perfil',
    async (req, res) => {
        const { nombre, direccion, telefono, email } = req.body;

        try {
            const user = req.user;

            user.nombre = nombre;
            user.direccion = direccion;
            user.telefono = telefono;
            user.email = email;

            await user.save();

            res.redirect('/perfil');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            res.redirect('/perfil');
        }
    });



app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return console.log(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return console.log(err);
            }
            return res.redirect('/perfil');
        });
    })(req, res, next);
});



// Registro de usuario
app.post('/register', (req, res) => {
    const { nombre, usuario, contraseña, email, es_admin, fecha_reg } = req.body;
    User.findOne({ $or: [{ usuario }, { email }] })
        .then((existingUser) => {
            if (existingUser) {
                return res.render('pages/users/register.ejs', {
                    message: '<span style="color: red; font-weight: bold;">El usuario o el correo electrónico ya están en uso</span>'
                });
            }
            const newUser = new User({
                nombre,
                usuario,
                contraseña,
                email,
                es_admin,
                fecha_reg
            });
            newUser.save()
                .then(() => {
                    res.redirect('/registerOK');
                })
                .catch((err) => {
                    console.error(err);
                    return res.render('pages/users/register.ejs', {
                        message: '<span style="color: red; font-weight: bold;">Error al crear el usuario</span>'
                    });
                });
        })
        .catch((err) => {
            console.error(err);
            return res.render('pages/users/register.ejs', {
                message: '<span style="color: red; font-weight: bold;">Error al verificar el usuario</span>'
            });
        });
});




app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user; // Accede al objeto de usuario autenticado
        if (user.es_admin) {
            res.render('pages/admin/dashboard.ejs', { user });
        } else {
            res.render('pages/users/perfil.ejs', { user });
        }
    } else {
        res.render('pages/users/login.ejs');
    }
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