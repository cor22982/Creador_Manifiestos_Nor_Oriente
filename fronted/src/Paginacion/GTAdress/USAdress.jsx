import React, { useEffect,useState } from 'react';
import useApi from '@hooks/useApi';
import './GTAdress.css'
import Tabla from '@components/Tabla'

function USAdress() {
  const [datos, setDatos] = useState([]);
  const columnas = ['id','address', 'city', 'postal_code','region_state'];
  const { llamadowithoutbody } = useApi();
  useEffect(() => {
    const getDirecciones = async () => {
      const data = await llamadowithoutbody('GET', 'http://127.0.0.1:8000/api/usa_address')
      setDatos(data);
    }
    getDirecciones();
  }, [])

  return (
    <div className='total'>
      <h2 className='titulo-pagina'>ESTADOS UNIDOS DIRECCIONES</h2>
      <div className="linea"></div>
      <br></br>
      <div className='contenido-tabla'>
        <Tabla columnas={columnas} datos={datos} />
      </div>
    </div>
  )
}

export default USAdress