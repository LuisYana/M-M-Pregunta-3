import React, { useState } from 'react';
import ListaEmpresas from './ListaEmpresas';
import ListaContactos from './ListaContactos';

const App = () => {
  const [vista, setVista] = useState('empresas');

  const cambiarVista = nuevaVista => {
    setVista(nuevaVista);
  };

  return (
    <div className="container mt-5">
      <nav>
        <button className="btn btn-success" onClick={() => cambiarVista('empresas')}>Empresas</button>
        <button className="btn btn-warning" onClick={() => cambiarVista('contactos')}>Contactos</button>
      </nav>

      {vista === 'empresas' && <ListaEmpresas />}
      {vista === 'contactos' && <ListaContactos />}
    </div>
  );
};

export default App;