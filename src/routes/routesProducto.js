// llamar un router express
const Router = require('express');

//llamamos al controlador de productos 

 const control = require('../Controllers/ControllerProducto.js');

 const routesProducto = Router();

 // rutar de productos 
 routesProducto.get('/', control.listarProductos);
 routesProducto.get('/:id', control.obtenerProductoPorId);
 routesProducto.post('/', control.crearProducto);
 routesProducto.put('/:id', control.actualizarProducto);
 routesProducto.delete('/:id', control.eliminarProducto);

 module.exports = routesProducto;