// llamar al modelo de producto
const Producto = require('../models/modelProducto.js');

//Validaciones 

const datosValidados = d => d.nombre && Number (d.precio) > 0 && Number (d.stock) >=0;
//Validacion del id
const idValido = id => Number(id) > 0;

async function listarProductos(req, res){
    res.json(await Producto.listarProductos());
} 

async function obtenerProductoPorId(req, res){
    const id = req.params.id;
    if(!idValido(id)){
        return res.status(400).json({error: 'Id no valido'});
        
    }
    res.json(await Producto.obtenerProductoPorId(id));
}
async function crearProducto(req, res){
    const {nombre, precio, stock} = req.body;
    if(!datosValidados({nombre, precio, stock})){
        return res.status(400).json({error: 'Datos no validos'});
    }
    res.json(await Producto.crearProducto(nombre, precio, stock));
}

async function actualizarProducto(req, res){
    const id = req.params.id;
    const {nombre, precio, stock} = req.body;
    if(!idValido(id)){
        return res.status(400).json({error: 'Id no valido'});
    }
    if(!datosValidados({nombre, precio, stock})){
        return res.status(400).json({error: 'Datos no validos'});
    }
    res.json(await Producto.actualizarProducto(id, nombre, precio, stock));
}

async function eliminarProducto(req, res){
    const id = req.params.id;
    if(!idValido(id)){
        return res.status(400).json({error: 'Id no valido'});
    }
    res.json(await Producto.eliminarProducto(id));
}


module.exports = {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}