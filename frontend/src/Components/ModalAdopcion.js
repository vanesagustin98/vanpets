// IMPORTACIONES
import React, { useState } from "react";  // Importa React y useState

// COMPONENTE FUNCIONAL ModalAdopcion
const ModalAdopcion = ({ showModal, handleClose, handleConfirm }) => {
    // Estados locales para el nombre y correo del adoptante
    const [nombreAdoptante, setNombreAdoptante] = useState("");
    const [correoAdoptante, setCorreoAdoptante] = useState("");

    // Función para manejar el clic en el botón de confirmar adopción
    const handleConfirmClick = () => {
        // Llama a la función handleConfirm del componente padre con los datos del adoptante
        handleConfirm(nombreAdoptante, correoAdoptante);
        
        // Reinicia los estados del nombre y correo del adoptante después de confirmar
        setNombreAdoptante("");
        setCorreoAdoptante("");
    };

    // Renderización del componente
    return (
        <div className={`modal ${showModal ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: showModal ? "block" : "none" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* Encabezado del modal con el título y botón de cierre */}
                    <div className="modal-header">
                        <h5 className="modal-title">Formulario de Adopción</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    
                    {/* Cuerpo del modal con el formulario para el nombre y correo del adoptante */}
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="nombreAdoptante" className="form-label">Nombre del Adoptante:</label>
                            <input
                                type="text"
                                id="nombreAdoptante"
                                className="form-control"
                                value={nombreAdoptante}
                                onChange={(e) => setNombreAdoptante(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="correoAdoptante" className="form-label">Correo Electrónico del Adoptante:</label>
                            <input
                                type="text"
                                id="correoAdoptante"
                                className="form-control"
                                value={correoAdoptante}
                                onChange={(e) => setCorreoAdoptante(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    {/* Pie del modal con botones de cerrar y confirmar adopción */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Cerrar
                        </button>
                        <button type="button" className="btn btn-success" onClick={handleConfirmClick}>
                            Confirmar Adopción
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Exporta el componente para su uso en otras partes de la aplicación
export default ModalAdopcion;
