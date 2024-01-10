import express from 'express';
import {obtenerMascotas,
    obtenerMascotaPorId,
    agregarMascota,
    actualizarMascota,
    eliminarMascota} from '../Controllers/mascotasController.js';
const routerMascotas = express.Router();

// Ruta para obtener todas las mascotas
routerMascotas.get('/obtener', obtenerMascotas);

// Ruta para obtener una mascota por ID
routerMascotas.get('/obtener/:id', obtenerMascotaPorId);

// Ruta para agregar una nueva mascota
routerMascotas.post('/agregar', agregarMascota);

// Ruta para actualizar una mascota por ID
routerMascotas.put('/actualizar/:id', actualizarMascota);

// Ruta para eliminar una mascota por ID
routerMascotas.delete('/eliminar/:id', eliminarMascota);

export {routerMascotas};