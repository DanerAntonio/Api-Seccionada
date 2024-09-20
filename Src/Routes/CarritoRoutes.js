// routes/carritoRoutes.js
const express = require('express');
const router = express.Router();
const carritoController = require('../Controllers/CarritoController');
const authMiddleware = require('../../Middlewares/AuthMiddlewares'); // Middleware de autenticación

// Obtener carrito del usuario
router.get('/', authMiddleware, carritoController.obtenerCarrito);

// Agregar producto al carrito
router.post('/agregar', authMiddleware, carritoController.agregarProducto);

// Actualizar producto en el carrito
router.put('/actualizar', authMiddleware, carritoController.actualizarProducto);

// Vaciar el carrito
router.delete('/vaciar', authMiddleware, carritoController.vaciarCarrito);

module.exports = router;
