import './GTAdress.css'
import Tabla from '@components/Tabla'
import React, { useEffect,useState } from 'react';
import useApi from '@hooks/useApi';

function GTAdress() {
  const [datos, setDatos] = useState([]);
  const columnas = ['id','address', 'city'];
  const { llamadowithoutbody } = useApi();

  useEffect(() => {
    const getDirecciones = async () => {
      const data = await llamadowithoutbody('GET', 'http://127.0.0.1:8000/api/guatemala_address')
      setDatos(data);
    }
    getDirecciones();
  }, [])

  return (
    <div className='total'> 
      <h2 className='titulo-pagina'>GUATEMALA DIRECCIONES</h2>
      <div className="linea"></div>
      <br></br>
      <div className='contenido-tabla'>
        <Tabla columnas={columnas} datos={datos} />
      </div>
    </div>
  ) 
}

export default GTAdress