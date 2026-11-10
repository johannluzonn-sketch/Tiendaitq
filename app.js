//llamar a express
const express = require('express');

//llamar a las rutas de productos
const routesProducto = require('./routes/routesProducto.js');

// crear una app de express
const app = express();
app.use(express.json());

//rutas de productos
app.use('/productos', routesProducto);
//Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});


//Siver para exportar o empaquetar la aplicacion 
module.exports = app;
