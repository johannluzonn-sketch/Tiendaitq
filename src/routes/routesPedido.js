// Llamar al Router de express (con llaves: solo traemos Router)
const { Router } = require('express');

// Controlador de pedidos y el guardia que revisa el token
const control = require('../controllers/ControllerPedido.js');
const verificarToken = require('../middlewares/verificarToken.js');

const routesPedido = Router();

// Todas las rutas de pedidos piden sesión
routesPedido.post('/', verificarToken, control.crearPedido);
routesPedido.get('/', verificarToken, control.listarMisPedidos);
routesPedido.get('/:id', verificarToken, control.obtenerPedido);

module.exports = routesPedido;