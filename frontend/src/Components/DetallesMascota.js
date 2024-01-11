// IMPORTACIONES
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa los estilos de Bootstrap
import React, { useState, useEffect } from 'react';  // Importa React, useState y useEffect
import { useParams, Link } from 'react-router-dom';  // Importa useParams y Link de react-router-dom
import axios from 'axios';  // Importa la biblioteca Axios para hacer solicitudes HTTP

// COMPONENTE FUNCIONAL DetallesMascota
const DetallesMascota = () => {
    // Extrae el parámetro 'id' de los parámetros de la URL
    const { id } = useParams();

    // Estado para almacenar los detalles de la mascota
    const [mascota, setMascota] = useState(null);

    // Efecto de montaje para obtener los detalles de la mascota según su ID
    useEffect(() => {
        // Función asincrónica para obtener detalles de la mascota
        const obtenerDetallesMascota = async () => {
            try {
                // Realiza una solicitud GET al servidor para obtener detalles de la mascota
                const respuesta = await axios.get(`http://localhost:8000/mascotas/obtener/${id}`);
                
                // Actualiza el estado con los detalles de la mascota
                setMascota(respuesta.data);
            } catch (error) {
                // Maneja errores en la consola si ocurren problemas al obtener detalles
                console.error('Error al obtener detalles de la mascota:', error);
            }
        };

        // Llama a la función para obtener detalles de la mascota
        obtenerDetallesMascota();
    }, [id]);  // El efecto se ejecuta cuando cambia el ID en los parámetros de la URL

    // Renderización del componente
    return (
        <div className="container mt-5">
            {/* Encabezado con título y botón para volver al inicio */}
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <h2>{mascota ? mascota.nombre : 'Detalles de la Mascota'}</h2>
                <Link to="/" className="btn btn-primary">
                    Volver al Inicio
                </Link>
            </div>

            {/* Contenido principal que muestra la información de la mascota */}
            {mascota ? (
                <div className="row">
                    {/* Columna izquierda con la imagen de la mascota */}
                    <div className="col-md-6">
                        <img
                            src={mascota.imagen}
                            className="img-fluid rounded"
                            alt={`Imagen de ${mascota.nombre}`}
                        />
                    </div>

                    {/* Columna derecha con detalles como raza y descripción */}
                    <div className="col-md-6">
                        <p><strong>Raza:</strong> {mascota.raza}</p>
                        <p><strong>Descripción:</strong> {mascota.descripcion}</p>
                    </div>
                </div>
            ) : (
                // Muestra un mensaje de carga si los detalles aún no se han cargado
                <p>Cargando detalles...</p>
            )}
        </div>
    );
};

// Exporta el componente para su uso en otras partes de la aplicación
export default DetallesMascota;
