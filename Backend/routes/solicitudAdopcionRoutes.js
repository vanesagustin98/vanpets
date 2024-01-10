import express from 'express';
import {obtenerSolicitudesAdopcion,
    obtenerSolicitudAdopcionPorId,
    agregarSolicitudAdopcion,
    actualizarSolicitudAdopcion,
    eliminarSolicitudAdopcion} from '../Controllers/solicitudAdopcionController.js';
const router = express.Router();

// Ruta para obtener todas las solicitudes de adopción
router.get('/obtener', obtenerSolicitudesAdopcion);

// Ruta para obtener una solicitud de adopción por ID
router.get('/obtener/:id', obtenerSolicitudAdopcionPorId);

// Ruta para agregar una nueva solicitud de adopción
router.post('/agregar', agregarSolicitudAdopcion);

// Ruta para actualizar una solicitud de adopción por ID
router.put('/actualizar/:id', actualizarSolicitudAdopcion);

// Ruta para eliminar una solicitud de adopción por ID
router.delete('/eliminar/:id', eliminarSolicitudAdopcion);

export {router}