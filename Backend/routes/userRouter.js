import express from 'express';
import {obtenerUserPorId,
    agregarUser, auth} from '../Controllers/userControllers.js';
const routerUser = express.Router();

// Ruta para obtener usuario por ID
routerUser.get('/obtener/:id', obtenerUserPorId);

// Ruta para agregar un usuario
routerUser.post('/agregar', agregarUser);

routerUser.post('/auth', auth);

export {routerUser}