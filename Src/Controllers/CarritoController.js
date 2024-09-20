// controllers/carritoController.js
const Carrito = require('../Models/CarritoModel');

// Obtener carrito por usuario
exports.obtenerCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findOne({ usuarioId: req.usuario.id }).populate('productos.productoId');
    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

// Agregar producto al carrito
exports.agregarProducto = async (req, res) => {
  const { productoId, cantidad, precio } = req.body;

  try {
    let carrito = await Carrito.findOne({ usuarioId: req.usuario.id });

    if (!carrito) {
      carrito = new Carrito({ usuarioId: req.usuario.id, productos: [], total: 0 });
    }

    const productoIndex = carrito.productos.findIndex(p => p.productoId.toString() === productoId);

    if (productoIndex > -1) {
      carrito.productos[productoIndex].cantidad += cantidad;
    } else {
      carrito.productos.push({ productoId, cantidad, precio });
    }

    carrito.total = carrito.productos.reduce((acc, item) => acc + item.cantidad * item.precio, 0);
    
    await carrito.save();
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};

// Actualizar producto en el carrito
exports.actualizarProducto = async (req, res) => {
  const { productoId, cantidad } = req.body;

  try {
    const carrito = await Carrito.findOne({ usuarioId: req.usuario.id });

    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    const productoIndex = carrito.productos.findIndex(p => p.productoId.toString() === productoId);

    if (productoIndex > -1) {
      carrito.productos[productoIndex].cantidad = cantidad;
    } else {
      return res.status(404).json({ mensaje: 'Producto no encontrado en el carrito' });
    }

    carrito.total = carrito.productos.reduce((acc, item) => acc + item.cantidad * item.precio, 0);
    
    await carrito.save();
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto del carrito' });
  }
};

// Vaciar carrito
exports.vaciarCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findOne({ usuarioId: req.usuario.id });

    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    carrito.productos = [];
    carrito.total = 0;

    await carrito.save();
    res.json({ mensaje: 'Carrito vaciado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al vaciar el carrito' });
  }
};
