import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/consultar')
      .then(response => {
        setEmpresas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Listado de Empresas</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setModalVisible(true)}
      >
        Agregar Empresa
      </button>
      
      {/* Modal para agregar empresas */}
      {modalVisible && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Empresa</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalVisible(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Contenido del formulario para agregar empresas */}
                <form>
                  <div className="form-group">
                    <label htmlFor="ruc">RUC</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ruc"
                    />
                    <label htmlFor="razonSocial">Razon Social</label>
                    <input
                      type="text"
                      className="form-control"
                      id="razonSocial"
                    />
                    <label htmlFor="direccion">Direccion</label>
                    <input
                      type="text"
                      className="form-control"
                      id="direccion"
                    />
                    <label htmlFor="distrito">Distrito</label>
                    <input
                      type="text"
                      className="form-control"
                      id="distrito"
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

                    const ruc = document.getElementById('ruc').value;
                    const razonSocial = document.getElementById('razonSocial').value;
                    const direccion = document.getElementById('direccion').value;
                    const distrito = document.getElementById('distrito').value;
                    
                    const nuevaEmpresa = {
                        nroRuc: ruc,
                        razonSocial: razonSocial,
                        direccion: direccion,
                        distrito: distrito
                    };
                    
                    // Realizar la solicitud POST
                    axios.post(process.env.REACT_APP_API_URL+'/agregar', nuevaEmpresa)
                        .then(response => {
                        setEmpresas([...empresas, response.data]);
                        
                        setModalVisible(false);
                        })
                        .catch(error => {
                        console.log('Error al guardar la empresa:', error);
                        });
                    }}
                >
                    Guardar Empresa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tabla de empresas */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nro. de RUC</th>
            <th>Nombre</th>
            <th>Direccion</th>
            <th>Distrito</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map(empresa => (
            <tr key={empresa.idEmpresa}>
              <td>{empresa.idEmpresa}</td>
              <td>{empresa.nroRuc}</td>
              <td>{empresa.razonSocial}</td>
              <td>{empresa.direccion}</td>
              <td>{empresa.distrito}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaEmpresas;