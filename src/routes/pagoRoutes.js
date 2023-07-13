import express from 'express';
import Pago from '../models/pagos.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
      const { nombre, apellido, numeroTarjeta, cvv, fechaVencimiento, fecha, montoTotal, articulos } = req.body;

      // Aquí puedes realizar las validaciones necesarias de los datos del formulario de pago

      // Crea un nuevo documento de pago en MongoDB
      const nuevoPago = new Pago({
        nombre,
        apellido,
        numeroTarjeta,
        cvv,
        fechaVencimiento,
        fecha: new Date(),
        montoTotal,
        articulos
      });
  
      await nuevoPago.save(); // Guarda el pago en la colección "pagos"
  
      res.render('pages/articulos/pagoExitoso.ejs'); // Renderiza la página de pago exitoso
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      res.status(500).send('Error al procesar el pago');
    }
  });

export default router;