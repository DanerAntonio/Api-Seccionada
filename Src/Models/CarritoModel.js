// models/Carrito.js
const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UsuarioModel',  // Referencia al modelo de Usuario
    required: true
  },
  productos: [
    {
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductoModel',  // Referencia al modelo de Producto
        required: true
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1
      },
      precio: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true,
    default: 0
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CarritoModel', carritoSchema);
