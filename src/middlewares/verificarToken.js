const jwt = require('jsonwebtoken');

// El guardia: se pone ANTES del controlador en la ruta
function verificarToken(req, res, next) {
    // Header esperado ->  Authorization: Bearer <token>
    const header = req.headers.authorization || '';
    const [tipo, token] = header.split(' ');
    if (tipo !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Falta el token' });
    }
    try {
        // Comprueba la firma y la expiración
        const datos = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = datos;   // { id, rol, iat, exp }
        next();                // pasa al controlador
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}

module.exports = verificarToken;