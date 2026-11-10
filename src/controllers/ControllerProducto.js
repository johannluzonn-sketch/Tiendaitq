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
    const resultado = await Producto.actualizarProducto(id, nombre, precio, stock);
    if(resultado.length === 0){
        return res.status(404).json({error: 'Producto no encontrado'});
    }
    res.status(200).json(resultado[0]);
}

async function eliminarProducto(req, res){
    const id = req.params.id;
    if(!idValido(id)){
        return res.status(400).json({error: 'Id no valido'});
    }
    const filas = await Producto.eliminarProducto(id);
    if(filas === 0){
        return res.status(404).json({error: 'Producto no encontrado'});
    }
    res.status(204).send();
}


module.exports = {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}