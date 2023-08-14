import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaContactos = () => {
  const [contactos, setContactos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/consultarContactos')
      .then(response => {
        setContactos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Listado de Contactos</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setModalVisible(true)}
      >
        Agregar Contacto
      </button>
      
      {/* Modal para agregar contactos */}
      {modalVisible && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Contacto</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalVisible(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Contenido del formulario para agregar contactos */}
                <form>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombres</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                    />
                    <label htmlFor="celular">Celular</label>
                    <input
                      type="text"
                      className="form-control"
                      id="celular"
                    />
                    <label htmlFor="direccion">Direccion</label>
                    <input
                      type="text"
                      className="form-control"
                      id="direccion"
                    />
                    <label htmlFor="correo">Correo</label>
                    <input
                      type="text"
                      className="form-control"
                      id="correo"
                    />
                    <label htmlFor="idEmpresa">Empresa</label>
                    <input
                      type="text"
                      className="form-control"
                      id="idEmpresa"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalVisible(false)}
                >
                  Cancelar
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {

                    const nombre = document.getElementById('nombre').value;
                    const celular = document.getElementById('celular').value;
                    const direccion = document.getElementById('direccion').value;
                    const correo = document.getElementById('correo').value;
                    const idEmpresa = document.getElementById('idEmpresa').value;
                    
                    const nuevoContacto = {
                        nombre: nombre,
                        celular: celular,
                        direccion: direccion,
                        correo: correo,
                        idEmpresa: idEmpresa
                    };
                    
                    axios.post(process.env.REACT_APP_API_URL + '/agregarContacto', nuevoContacto)
                        .then(response => {
                        setContactos([...contactos, response.data]);
                        
                        setModalVisible(false);
                        })
                        .catch(error => {
                        console.log('Error al guardar el contacto:', error);
                        });
                    }}
                >
                    Guardar Contacto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tabla de contactos */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Celular</th>
            <th>Direccion</th>
            <th>Correo</th>
            <th>Empresa</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map(contacto => (
            <tr key={contacto.idContacto}>
              <td>{contacto.idContacto}</td>
              <td>{contacto.nombre}</td>
              <td>{contacto.celular}</td>
              <td>{contacto.direccion}</td>
              <td>{contacto.correo}</td>
              <td>{contacto.idEmpresa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaContactos;