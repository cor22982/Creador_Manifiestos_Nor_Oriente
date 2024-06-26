import React from 'react'
import './Home.css'
import useCode from '@hooks/useCode'
import LabelCustom from '@components/LabelCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPrint } from '@fortawesome/free-solid-svg-icons';
import Button from '@components/Button';
import {faFile, faPen } from '@fortawesome/free-solid-svg-icons';
function Home() {
  const { code } = useCode();
  const fecha = new Date();
  const fechaFormateada = fecha.toLocaleDateString();
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
      <br></br>
      <div className="contenido-factura">
        <div className="label-contenido">
          <p className='label-name'>Envia:</p>
          <p className='label-info'>MATHEW ALEXANDER CORDERO AQUINO</p>
        </div>
        <div className="label-contenido">
          <p className='label-name'>Direccion:</p>
          <p className='label-info'>20 CALLE Y 13 AVENIDA ZONA 0</p>
        </div>
        <div className="label-contenido">
          <p className='label-name'>Recibe:</p>
          <p className='label-info'>BLANCA BERGANZA </p>
        </div>
        <div className="label-contenido">
          <p className='label-name'>Direccion Recibe:</p>
          <p className='label-info'>1 MAPLE ST NEW YORK HILLS NY 10080</p>
        </div>
        <div className="telefono-fecha" >
          <div className="label-contenido">
            <p className='label-name'>Telefono:</p>
            <p className='label-info'>3855073371</p>
          </div>
          <div className="label-contenido">
            <p className='label-name'>Fecha:</p>
            <p className='label-info'>{fechaFormateada}</p>
          </div> 
        </div>

        <div className="contenedor-grande">
          <div className="label-grande">
            <p className='titulo-grande'>Tipo</p>
            <p className='contenido-grande'>SECO</p>
          </div>
          <div className="label-grande">
            <p className='titulo-grande'>Contenido</p>
            <p className='contenido-grande'>BREAD,CHEESE,TAMALITOS,CONDIMENTS,COOKED VEGETABLES </p>
          </div>
          <div className="label-grande">
            <p className='titulo-grande'>Peso(Lb)</p>
            <p className='contenido-grande'>55</p>
          </div>
          
        </div>

        <div className="butoon-contenido">
          
          <div className="label-contenido">
            <p className='label-name'>Atendido por:</p>
            <p className='label-info'>CHIQUIMULA - GUATEMALA</p>
          </div>
          <div className="label-contenido">
            <p className='label-name'>Oficina:</p>
            <p className='label-info'>JACKELINE</p>
          </div>
          <button className='icono-boton-print'>
            <FontAwesomeIcon
              icon={faPrint}
              ></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <br></br>
      <div className="buttons-container">
        <Button 
            iconin={faPrint} 
            titule='IMPRIMIR'
            fontcolor='white'
            color='#0090FF'
            hovercolor='#1B75BA'
            ></Button>
        <Button 
            iconin={faPen} 
            titule='REGISTRAR '
            fontcolor='white'
            color='#1B75BA'
            hovercolor='#1B75BA'
            ></Button>
        <Button 
            iconin={faPen} 
            titule='MODIFICAR'
            fontcolor='#1B75BA'
            color='#DBECF9'
            hovercolor='#1B75BA'
            bordercolor='#07395E'
            ></Button>
        <Button 
            iconin={faPen} 
            titule='ELIMINAR'
            fontcolor='#07395E'
            color='white'
            hovercolor='#1B75BA'
            bordercolor='#07395E'
            ></Button>
      </div>
    </div>
  )
}

export default Home