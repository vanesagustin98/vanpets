import { DataTypes } from 'sequelize';
import {db} from '../Database/database.js';

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


export {User};