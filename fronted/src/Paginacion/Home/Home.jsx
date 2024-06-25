import React from 'react'
import './Home.css'
import useApi from '@hooks/useApi';
import useCode from '@hooks/useCode'
function Home() {
  const { code } = useCode();
  return (
    <div className="total">
      <div className="titulos" >
        <h2 className='titulo-pagina'>CREACION DE BULTOS</h2>
        <h2 className='titulo-pagina'>{code}</h2>
      </div>
      <div className="linea"></div>
    </div>
  )
}

export default Home