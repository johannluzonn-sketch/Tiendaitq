const pool = require('../config/db.js'); 

async function listarProductos(){
    const r = await pool.query('SELECT * FROM productos');
    return r.rows;
}

async function obtenerProductoPorId(id){
    const r = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    return r.rows;
}

async function crearProducto(nombre, precio, stock){
    const r = await pool.query('INSERT INTO productos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING *', [nombre, precio, stock]);
    return r.rows;
}   

async function actualizarProducto(id, nombre, precio, stock){
    const r = await pool.query('UPDATE productos SET nombre = $1, precio = $2, stock = $3 WHERE id = $4 RETURNING *', [nombre, precio, stock, id]);
    return r.rows;
}  
 
async function eliminarProducto(id){
    const r = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
    return r.rows;
}  

module.exports = {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}



