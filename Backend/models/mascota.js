import { DataTypes } from 'sequelize';
import {db}  from '../Database/database.js';

const Mascota = db.define('Mascota', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    raza: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    temperamento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export  {Mascota};