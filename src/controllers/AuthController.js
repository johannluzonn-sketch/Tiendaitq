// Librerías: bcryptjs (hash) y jsonwebtoken (token)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cliente = require('../models/modelCliente.js');

// Validaciones sencillas
const validarEmail = email => typeof email === 'string' && email.includes('@');
const validarPassword= password => typeof password === 'string' && password.length >= 8;

async function registro(req, res) {
    const { nombre, email, password } = req.body ?? {};
    if (!nombre || !validarEmail(email) || !validarPassword(password)) {
        return res.status(400).json({
            error: 'Nombre, email válido y clave de 8 caracteres o más' });
    }
    try {
        // ¿Ese email ya tiene cuenta?
        const existe = await Cliente.buscarPorEmail(email.toLowerCase());
        if (existe) {
            return res.status(409).json({ error: 'El email ya está registrado' });
        }
        // Hash de la clave: 10 rondas de bcrypt
        const hash = await bcrypt.hash(password, 10);
        const nuevo = await Cliente.crearCliente(nombre, email.toLowerCase(), hash);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function login(req, res) {
    const { email, password } = req.body ?? {};
    if (!validarEmail(email) || !validarPassword(password)) {
        return res.status(400).json({ error: 'Email y clave son obligatorios' });
    }
    try {
        // 1. ¿Existe el cliente?
        const cliente = await Cliente.buscarPorEmail(email.toLowerCase());
        // 2. ¿La clave coincide con el hash guardado?
        const ok = cliente && await bcrypt.compare(password, cliente.password);
        if (!ok) {
            // Mismo mensaje en los dos casos: no damos pistas
            return res.status(401).json({ error: 'Email o clave incorrectos' });
        }
        // 3. Firmar el token con el id y el rol (nunca la clave)
        const token = jwt.sign(
            { id: cliente.id, rol: cliente.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || '2h' });
        res.status(200).json({
            token,
            cliente: { id: cliente.id, nombre: cliente.nombre, rol: cliente.rol }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Ruta protegida: solo llega aquí si el token es válido
async function perfil(req, res) {
    const cliente = await Cliente.obtenerClientePorId(req.usuario.id);
    if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json(cliente);
}

module.exports = { registro, login, perfil };