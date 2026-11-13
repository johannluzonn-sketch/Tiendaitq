// llamar al modelo de categoria \

const modelCategoria = require('../models/modelCategoria.js');
//validacion de datos 

const datosValidados = d => d.nombre && d.nombre.trim() !== '';
//Validacion del id
const idValido = id => !isNaN(parseInt(id)) && parseInt(id) > 0;

// funciones de listar Obtener por id, crear, actualizar y eliminar 

async function listarCategorias(req, res) {
    try{
        const categorias = await Categoria. listarCategorias();
        res.status(200).json(categorias);
    } catch (error){
        console.error(error);
        res.status(500).json ({error: 'Error interno del servidor'});
    }
}

async function obtenerCategoriaPorId(req, res) {
    const id = req.params.id;
    if (!idValido(id)) {
        return res.status(400).json({ error: 'ID no existe' });
    }
    try {
        const categoria = await Categoria.obtenerCategoriaPorId(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.status(200).json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }  
}


async function crearCategoria(req, res) {
    const { nombre } = req.body;
    if (!datosValidados({ nombre })) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }
    try {
        const nuevaCategoria = await Categoria.crearCategoria(nombre);
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function actualizarCategoria(req, res) {
    const id = req.params.id;
    const { nombre } = req.body;
    if (!idValido(id)) {
        return res.status(400).json({ error: 'ID no existe' });
    }
    try {
        const categoriaActualizada = await Categoria.actualizarCategoria(id, nombre);
        if (!categoriaActualizada) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.status(200).json(categoriaActualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function eliminarCategoria(req, res) {
    const id = req.params.id;
    if (!idValido(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    try {
        // ¿Tiene productos activos? Entonces no se desactiva
        const total = await Categoria.contarProductosActivos(id);
        if (total > 0) {
            return res.status(409).json({
                error: 'La categoría tiene productos activos',
                productos: total
            });
        }
        // Borrado lógico: el modelo marca activo = false
        const categoriaEliminada = await Categoria.eliminarCategoria(id);
        if (!categoriaEliminada) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
 
module.exports = {
    listarCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};
