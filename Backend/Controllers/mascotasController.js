import { Mascota } from '../models/mascota.js';

// Controlador para obtener todas las mascotas
const obtenerMascotas = async (req, res) => {
    try {
        const mascotas = await Mascota.findAll();
        res.json(mascotas);
    } catch (error) {
        console.error('Error al obtener mascotas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener una mascota por ID
const obtenerMascotaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const mascota = await Mascota.findByPk(id);
        if (mascota) {
            res.json(mascota);
        } else {
            res.status(404).json({ error: 'Mascota no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener mascota por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para agregar una nueva mascota
const agregarMascota = async (req, res) => {
    const { nombre, tipo } = req.body;

    try {
        const nuevaMascota = await Mascota.create({ nombre, tipo });
        res.status(201).json(nuevaMascota);
    } catch (error) {
        console.error('Error al agregar mascota:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar una mascota por ID
const actualizarMascota = async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo } = req.body;

    try {
        const mascota = await Mascota.findByPk(id);
        if (mascota) {
            await mascota.update({ nombre, tipo });
            res.json(mascota);
        } else {
            res.status(404).json({ error: 'Mascota no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar mascota por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar una mascota por ID
const eliminarMascota = async (req, res) => {
    const { id } = req.params;

    try {
        const mascota = await Mascota.findByPk(id);
        if (mascota) {
            await mascota.destroy();
            res.json({ mensaje: 'Mascota eliminada correctamente' });
        } else {
            res.status(404).json({ error: 'Mascota no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar mascota por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export {
    obtenerMascotas,
    obtenerMascotaPorId,
    agregarMascota,
    actualizarMascota,
    eliminarMascota,
};