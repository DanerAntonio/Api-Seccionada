// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Obtener el token del encabezado Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Asegúrate de que sea Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Agregar la información del usuario decodificado a la solicitud
        req.userId = decoded.id;
        req.userRole = decoded.rol; // Opcional: Agregar el rol del usuario si es necesario
        next();
    });
};

module.exports = auth;
