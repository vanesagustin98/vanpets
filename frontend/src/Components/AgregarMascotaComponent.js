// Importaciones de módulos y componentes necesarios
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Definición del componente funcional AgregarMascotaComponent
const AgregarMascotaComponent = () => {
    // URL del servidor donde se gestionan las mascotas
    const url = "http://localhost:8000/mascotas";

    // Estados para almacenar los datos del formulario y mensajes de éxito/error
    const [nombre, setNombre] = useState('');
    const [raza, setRaza] = useState('');
    const [temperamento, setTemperamento] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');
    const [error, setError] = useState('');

    // Función para manejar el evento de agregar una mascota
    const handleAgregarMascota = async () => {
        try {
            // Realiza una solicitud POST al servidor con los datos del formulario
            const response = await axios.post(`${url}/agregar`, {
                nombre,
                raza,
                temperamento,
                descripcion,
                imagen,
            });

            // Verifica si la mascota se agregó con éxito (código de estado HTTP 201)
            if (response.status === 201) {
                // Actualiza el estado para mostrar un mensaje de éxito
                setMensajeExito('Mascota agregada exitosamente');
                // Limpia los campos del formulario después de agregar la mascota
                setNombre('');
                setRaza('');
                setTemperamento('');
                setDescripcion('');
                setImagen('');
            } else {
                // Si la solicitud no fue exitosa, muestra un mensaje de error
                setError('Error al agregar la mascota');
            }
        } catch (error) {
            // Manejo de errores: muestra un mensaje de error y registra detalles en la consola
            setError('Error al agregar la mascota');
            console.error('Error al agregar la mascota:', error);
        }
    };

    // Renderización del componente
    return (
        <div className="container mt-5">
            <h2>Agregar Nueva Mascota</h2>

            {/* Muestra mensajes de éxito y error */}
            {mensajeExito && (
                <div className="alert alert-success" role="alert">
                    {mensajeExito}
                </div>
            )}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {/* Formulario para ingresar los datos de la nueva mascota */}
            <form>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="raza" className="form-label">Raza:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="raza"
                        value={raza}
                        onChange={(e) => setRaza(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="temperamento" className="form-label">Temperamento:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="temperamento"
                        value={temperamento}
                        onChange={(e) => setTemperamento(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción:</label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="imagen" className="form-label">URL de la Imagen:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imagen"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                    />
                </div>
                
                {/* Botón para agregar la mascota, invoca la función handleAgregarMascota */}
                <button type="button" className="btn btn-primary" onClick={handleAgregarMascota}>
                    Agregar Mascota
                </button>
            </form>

            {/* Enlace para volver al inicio */}
            <Link to="/" className="btn btn-secondary mt-3">
                Volver al Inicio
            </Link>
        </div>
    );
};

// Exporta el componente para su uso en otras partes de la aplicación
export default AgregarMascotaComponent;
