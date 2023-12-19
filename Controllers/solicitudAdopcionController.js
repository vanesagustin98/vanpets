import { SolicitudAdopcion } from '../models/solicitudAdopcion.js';

// Controlador para obtener todas las solicitudes de adopción
const obtenerSolicitudesAdopcion = async (req, res) => {
    try {
        const solicitudesAdopcion = await SolicitudAdopcion.findAll();
        res.json(solicitudesAdopcion);
    } catch (error) {
        console.error('Error al obtener solicitudes de adopción:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener una solicitud de adopción por ID
const obtenerSolicitudAdopcionPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const solicitudAdopcion = await SolicitudAdopcion.findByPk(id);
        if (solicitudAdopcion) {
            res.json(solicitudAdopcion);
        } else {
            res.status(404).json({ error: 'Solicitud de adopción no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener solicitud de adopción por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para agregar una nueva solicitud de adopción
const agregarSolicitudAdopcion = async (req, res) => {
    const { id_mascota, nombre_solicitante, correo_solicitante } = req.body;

    try {
        const nuevaSolicitudAdopcion = await SolicitudAdopcion.create({
            id_mascota,
            nombre_solicitante,
            correo_solicitante,
        });
        res.status(201).json(nuevaSolicitudAdopcion);
    } catch (error) {
        console.error('Error al agregar solicitud de adopción:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar una solicitud de adopción por ID
const actualizarSolicitudAdopcion = async (req, res) => {
    const { id } = req.params;
    const { id_mascota, nombre_solicitante, correo_solicitante } = req.body;

    try {
        const solicitudAdopcion = await SolicitudAdopcion.findByPk(id);
        if (solicitudAdopcion) {
            await solicitudAdopcion.update({
                id_mascota,
                nombre_solicitante,
                correo_solicitante,
            });
            res.json(solicitudAdopcion);
        } else {
            res.status(404).json({ error: 'Solicitud de adopción no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar solicitud de adopción por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar una solicitud de adopción por ID
const eliminarSolicitudAdopcion = async (req, res) => {
    const { id } = req.params;

    try {
        const solicitudAdopcion = await SolicitudAdopcion.findByPk(id);
        if (solicitudAdopcion) {
            await solicitudAdopcion.destroy();
            res.json({ mensaje: 'Solicitud de adopción eliminada correctamente' });
        } else {
            res.status(404).json({ error: 'Solicitud de adopción no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar solicitud de adopción por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export {
    obtenerSolicitudesAdopcion,
    obtenerSolicitudAdopcionPorId,
    agregarSolicitudAdopcion,
    actualizarSolicitudAdopcion,
    eliminarSolicitudAdopcion,
};