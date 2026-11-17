//Llamar al Router de express (con llaves: solo traemos Router)
const { Router } = require('express');

//Controlador de autenticación y el middleware que revisa el token
const control = require('../controllers/AuthController.js');
const verificarToken = require('../middlewares/verificarToken.js');

const routesAuth = Router();

//Rutas libres: cualquiera puede registrarse o iniciar sesión
routesAuth.post('/registro', control.registro);
routesAuth.post('/login', control.login);

//Ruta protegida: primero el guardia, luego el controlador
routesAuth.get('/perfil', verificarToken, control.perfil);

module.exports = routesAuth;