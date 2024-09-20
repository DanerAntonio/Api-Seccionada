require('dotenv').config(); // Cargar variables de entorno desde un archivo .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Para permitir solicitudes CORS
const bodyParser = require('body-parser');

// Importar rutas

const carritoRoutes = require('./Src/Routes/CarritoRoutes');




// Configuración del servidor
const app = express();
const PORT = process.env.PORT || 5000;

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Middlewares
app.use(cors());
app.use(bodyParser.json()); // Para parsear el cuerpo de las solicitudes en formato JSON

// Rutas
app.use('/api/carritos', carritoRoutes);


// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
