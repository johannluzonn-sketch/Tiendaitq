// importar el pool de conexiones

const pool = require('../config/db.js');

// Funciones de Listar 

async function listarCategorias(){
    const r = await pool.query(`SELECT id, nombre FROM categorias
         WHERE activo = true ORDER BY id`);
    return r.rows;
}
// Funciones de Obtener por ID
async function obtenerCategoriaPorId(id){
    const r = await pool.query(`SELECT id, nombre FROM categorias
         WHERE id = $1 AND activo = true`, [id]);
    return r.rows[0];
}

// Funciones de Crear
async function crearCategoria(nombre){
    const r = await pool.query('INSERT INTO categorias (nombre) VALUES ($1) RETURNING *', [nombre]);
    return r.rows[0];
}

// Funciones de Actualizar
async function actualizarCategoria(id, nombre){
    const r = await pool.query('UPDATE categorias SET nombre = $1 WHERE id = $2 RETURNING *', [nombre, id]);
    return r.rows[0];
}

// Funciones de Eliminar
async function eliminarCategoria(id){
    const r = await pool.query(`UPDATE categorias SET activo = false
         WHERE id = $1 AND activo = true RETURNING *`, [id]);
    return r.rowCount;
}

async function contarProductosActivos(id){
    const r = await pool.query(
        `SELECT COUNT(*)::int AS total FROM productos
         WHERE categoria_id = $1 AND activo = true`, [id]);
    return r.rows[0].total;
}

// Exportar las funciones
module.exports = {
    listarCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    contarProductosActivos
}