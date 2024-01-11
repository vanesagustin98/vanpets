// Importa los componentes y elementos necesarios de react-router-dom, CSS y otros componentes locales
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Cards from './Components/Cards.js';
import DetallesMascota from './Components/DetallesMascota.js';
import AgregarMascotaComponent from './Components/AgregarMascotaComponent.js';

// Definición del componente funcional App
function App() {
  // Renderización del componente
  return (
    // Configuración del enrutador BrowserRouter
    <BrowserRouter>
      {/* Definición de rutas mediante el componente Routes */}
      <Routes>
        {/* Ruta para la página principal ('/') que renderiza el componente Cards */}
        <Route path='/' element={<Cards></Cards>}></Route>

        {/* Ruta para la página de detalles de mascota ('/mascotas/:id') que renderiza el componente DetallesMascota */}
        <Route path="/mascotas/:id" element={<DetallesMascota></DetallesMascota>} />

        {/* Ruta para la página de agregar mascota ('/agregar-mascota') que renderiza el componente AgregarMascotaComponent */}
        <Route path="/agregar-mascota" element={<AgregarMascotaComponent></AgregarMascotaComponent>} />
      </Routes>
    </BrowserRouter>
  );
}

// Exporta el componente principal para su uso en otras partes de la aplicación
export default App;
