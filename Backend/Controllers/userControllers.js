import { User } from '../models/User.js';

const obtenerUserPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para agregar un nuevo usuario
const agregarUser = async (req, res) => {
    const {usuario, contrasena } = req.body;

    try {
        const user = await User.create({
            usuario,
            contrasena,
        });
        res.status(201).json(user);
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const auth = async (req, res) => {
    const { usuario, contrasena } = req.body;

    try {
        // Encuentra al usuario administrador por nombre de usuario
        const adminUser = await User.findOne({ where: { usuario } });

        if (!adminUser) {
            return res.status(401).json({ mensaje: 'Nombre de usuario o contraseña incorrectos' });
        }

        // Compara la contraseña proporcionada con el hash almacenado
        const contrasenaValida = adminUser.contrasena === contrasena;

        if (!contrasenaValida) {
            return res.status(401).json({ mensaje: 'Nombre de usuario o contraseña incorrectos' });
        }

        // En este punto, la autenticación ha sido exitosa
        return res.status(200).json({ mensaje: 'Autenticación exitosa' });
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({ error: 'Error interno en la autenticación' });
    }
};


export {
    obtenerUserPorId,
    agregarUser,
    auth
};