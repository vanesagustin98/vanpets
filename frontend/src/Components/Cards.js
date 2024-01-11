// Importaciones de estilos y módulos necesarios
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import ModalAdopcion from "./ModalAdopcion";
import { Link } from 'react-router-dom';

// Definición del componente funcional MascotasComponent
const MascotasComponent = () => {
    // URLs de los endpoints del servidor
    const url = "http://localhost:8000/mascotas";
    const urlAdopcion = "http://localhost:8000/solicitudAdopcion";
    const urlAdminAuth = "http://localhost:8000/user/auth"; // Endpoint para autenticación del administrador

    // Estados para almacenar datos de mascotas, modal, estado de administrador y credenciales del administrador
    const [mascotas, setMascotas] = useState([]);
    const [id, setId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [error, setError] = useState('');

    // Efecto de montaje para obtener las mascotas al cargar el componente
    useEffect(() => {
        getMascotas();
    }, []);

    // Función para obtener las mascotas desde el servidor
    const getMascotas = async () => {
        try {
            const respuesta = await axios.get(`${url}/obtener`);
            setMascotas(respuesta.data);
        } catch (error) {
            console.error('Error al obtener mascotas:', error);
        }
    };

    // Función para manejar la adopción de una mascota
    const handleAdoptar = (mascotaId) => {
        setId(mascotaId);
        setShowModal(true);
    };

    // Función para cerrar el modal de adopción
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Función para confirmar la adopción de una mascota
    const handleConfirmAdopcion = async (nombreAdoptante, correoAdoptante) => {
        try {
            // Agrega la solicitud de adopción
            const responseAdopcion = await axios.post(`${urlAdopcion}/agregar`, {
                id_mascota: id,
                nombre_solicitante: nombreAdoptante,
                correo_solicitante: correoAdoptante
            });

            if (responseAdopcion.status === 201) {
                console.log('Adopción exitosa');

                // Elimina la mascota después de la adopción
                const responseEliminar = await axios.delete(`${url}/eliminar/${id}`);

                if (responseEliminar.status === 200) {
                    console.log('Mascota eliminada');
                    // Realiza acciones adicionales si es necesario
                    getMascotas(); // Recargar la lista de mascotas después de la adopción y eliminación
                } else {
                    console.log('Error al eliminar la mascota');
                }
            } else {
                console.log('Error al adoptar');
            }
        } catch (error) {
            console.error('Error en la adopción:', error);
        }

        // Cierra el modal
        setShowModal(false);
    };

    // Función para manejar el inicio de sesión del administrador
    const handleAdminLogin = async () => {
        try {
            const response = await axios.post(urlAdminAuth, {
                usuario: adminUsername,
                contrasena: adminPassword
            });

            if (response.status === 200) {
                console.log('Autenticación exitosa');
                setIsAdmin(true);
            } else {
                console.log('Autenticación fallida');
                setError('Nombre de usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
            setError('Error en la autenticación');
        }
    };

    // Función para cerrar la sesión del administrador
    const handleAdminLogout = () => {
        setIsAdmin(false);
        setAdminUsername('');
        setAdminPassword('');
        setError('');
    };

    // Renderización del componente
    return (
        <div className="container mt-5">
            {/* Condicionalmente renderiza contenido para administradores o usuarios regulares */}
            {isAdmin ? (
                <div className="mb-3">
                    <h5>¡Bienvenido Administrador!</h5>
                    <button className="btn btn-danger" onClick={handleAdminLogout}>
                        Cerrar Sesión de Administrador
                    </button>

                    {/* Botón para agregar mascotas */}
                    <Link to="/agregar-mascota" className="btn btn-primary ms-2">
                        Agregar Mascota
                    </Link>
                </div>
            ) : (
                <div className="d-flex">
                    {/* Campos y botón para iniciar sesión como administrador */}
                    <div className="mb-3 me-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Usuario"
                            value={adminUsername}
                            onChange={(e) => setAdminUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 me-2">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="form-control"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={handleAdminLogin}>
                            Ingresar como Administrador
                        </button>
                    </div>
                </div>
            )}

            {/* Muestra la lista de mascotas */}
            <div className="row">
                {mascotas.map((mascota, i) => (
                    <div key={mascota.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={mascota.imagen}
                                className="card-img-top"
                                alt={`Imagen de ${mascota.nombre}`}
                            />
                            <div className="card-body">
                                <h5 className="card-title">Nombre: {mascota.nombre}</h5>
                                <p className="card-text">Raza: {mascota.raza}</p>
                                <p className="card-text">{mascota.temperamento}</p>
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleAdoptar(mascota.id)}
                                >
                                    Adoptar
                                </button>
                                {/* Enlace para ver detalles de la mascota */}
                                <Link to={`/mascotas/${mascota.id}`} className="btn btn-primary ms-2">
                                    Detalles
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal para confirmar adopción */}
            <ModalAdopcion
                showModal={showModal}
                handleClose={handleCloseModal}
                handleConfirm={handleConfirmAdopcion}
            />

            {/* Muestra mensaje de error si existe */}
            {error && (
                <div className="alert alert-danger mt-3" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
};

// Exporta el componente para su uso en otras partes de la aplicación
export default MascotasComponent;
