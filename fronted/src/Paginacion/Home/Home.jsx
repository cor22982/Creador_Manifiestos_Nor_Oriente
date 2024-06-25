import React from 'react'
import './Home.css'
import useCode from '@hooks/useCode'
import LabelCustom from '@components/LabelCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const { code } = useCode();
  return (
    <div className="total">
      <div className="titulos" >
        <h2 className='titulo-pagina'>CREACION DE BULTOS</h2>
        <h2 className='titulo-pagina' style={{fontSize: '20px'}}>{ '202 - ' + code}</h2>
      </div>
      <div className="linea"></div>
      <br></br>
      <div className="informacion">
        <LabelCustom 
          titule= '35'
          simbol= 'No'></LabelCustom>
        <LabelCustom 
          titule= '1000'
          simbol= 'KG'></LabelCustom>
        <LabelCustom 
          titule= '35'
          simbol= 'Frios'></LabelCustom>
        <LabelCustom 
          titule= '35'
          simbol= 'Secos'></LabelCustom>
        <LabelCustom 
          titule= '2204.62'
          simbol= 'LB'></LabelCustom>
        <br></br>
        <button className='icono-boton-home'>
          <FontAwesomeIcon
            icon={faDownload}
            ></FontAwesomeIcon>
        </button>
      </div>
      
    </div>
  )
}

export default Home