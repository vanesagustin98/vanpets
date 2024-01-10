import { DataTypes } from 'sequelize';
import {db} from '../Database/database.js';
import {Mascota} from './mascota.js'; // Importa el modelo de mascotas

const SolicitudAdopcion = db.define('SolicitudAdopcion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_solicitante: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo_solicitante: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Establece la relación con la tabla de mascotas
SolicitudAdopcion.belongsTo(Mascota, { foreignKey: 'id_mascota' });

export {SolicitudAdopcion};