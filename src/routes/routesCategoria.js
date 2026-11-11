
//Llamar al Router de express (con llaves: solo traemos Router)
const { Router } = require('express');
 
//Llamamos al controlador de productos
const control = require('../controllers/ControllerCategoria.js');
 
const routesCategoria = Router();
 
//Rutas de productos
routesCategoria.get('/', control.listarCategorias);
routesCategoria.get('/:id', control.obtenerCategoriaPorId);
routesCategoria.post('/', control.crearCategoria);
routesCategoria.put('/:id', control.actualizarCategoria);
routesCategoria.delete('/:id', control.eliminarCategoria);
 
module.exports = routesCategoria;
 
 
//Llamar a express
const express = require('express');
//Llamar a las rutas de productos
const routesProductos = require('./routes/routesProductos.js');
//Llamar a la ruta de Categoria
const routesCategoria = require('./routes/routesCategoria.js')
 
//Crear una aplicacion de express
const app = express();
app.use(express.json());
 
