const pool = require('../config/db.js'); 

async function crearCliente(nombre, email, passwordHash){
    const r = await pool.query(
        `INSERT INTO clientes (nombre, email, password)
         VALUES ($1, $2, $3)
         RETURNING id, nombre, email, rol`,
        [nombre, email, passwordHash]);
    return r.rows[0];
}

async function buscarPorEmail(email){
    const r = await pool.query(
        `SELECT id, nombre, email, password, rol
         FROM clientes
         WHERE email = $1 AND activo = true`, [email]);
    return r.rows[0];
}

async function obtenerClientePorId(id){
    const r = await pool.query(
        `SELECT id, nombre, email, rol, creado_en
         FROM clientes
         WHERE id = $1 AND activo = true`, [id]);
    return r.rows[0];
}

module.exports = { 
    crearCliente, 
    buscarPorEmail, 
    obtenerClientePorId 
};

