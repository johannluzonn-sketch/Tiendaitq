// Modelos de Pedido y Producto
const Pedido = require('../models/modelPedido.js');
const Producto = require('../models/modelProducto.js');

// Validaciones sencillas
const idValido = id => Number.isInteger(Number(id)) && Number(id) > 0;
const itemValido = it => it && idValido(it.producto_id)
    && Number.isInteger(Number(it.cantidad)) && Number(it.cantidad) > 0;

// POST /pedidos -> body: { items: [ { producto_id, cantidad } ] }
async function crearPedido(req, res) {
    const { items } = req.body ?? {};
    if (!Array.isArray(items) || items.length === 0 || !items.every(itemValido)) {
        return res.status(400).json({
            error: 'Envía items: [{ producto_id, cantidad }] con cantidades mayores a 0' });
    }
    try {
        // 1. Antes de crear nada: ¿existen todos los productos?
        for (const it of items) {
            const producto = await Producto.obtenerProductoPorId(it.producto_id);
            // Tu modelProducto devuelve un arreglo: vacío = no existe
            if (!producto || producto.length === 0) {
                return res.status(400).json({
                    error: `El producto ${it.producto_id} no existe` });
            }
        }
        // 2. El dueño sale del TOKEN, nunca del body
        const pedido = await Pedido.crearPedido(req.usuario.id);

        // 3. Una fila de detalle por cada producto
        for (const it of items) {
            await Pedido.agregarDetalle(pedido.id, it.producto_id, it.cantidad);
        }

        // 4. Total = suma de subtotales
        const final = await Pedido.actualizarTotal(pedido.id);
        const detalle = await Pedido.obtenerDetalle(pedido.id);
        res.status(201).json({ ...final, detalle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// GET /pedidos -> solo los pedidos de quien inició sesión
async function listarMisPedidos(req, res) {
    try {
        const pedidos = await Pedido.listarPedidosDeCliente(req.usuario.id);
        res.status(200).json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// GET /pedidos/:id -> cabecera + detalle, si el pedido es mío
async function obtenerPedido(req, res) {
    const id = req.params.id;
    if (!idValido(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    try {
        const pedido = await Pedido.obtenerPedido(id, req.usuario.id);
        if (!pedido) {
            // No existe o es de otra persona: la respuesta es la misma
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        const detalle = await Pedido.obtenerDetalle(id);
        res.status(200).json({ ...pedido, detalle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = { crearPedido, listarMisPedidos, obtenerPedido };