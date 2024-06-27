import React, { useEffect, useState } from 'react';
import './Imprimir.css'
import PopUp from '@components/PopUp';
import InputHolder from '@components/InputHolder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import Button from '@components/Button';
import ListDisplay from '../../Components/ListDisplay/ListDisplay';

function Imprimir({activar, setActivar}) {
  const [codigos, setCodigos] = useState('');
  const [codigo, setCodigo] = useState('');
  const exampleList = ['Item 1', 'Item 2', 'Item 3', 'Item 4','Item 1', 'Item 2', 'Item 3', 'Item 4'];
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div className='contenido'>
        <h2>IMPRIMIR</h2>
        <div className="print-array">
          <div className='codigos-imprimir'>
            <h3 style={{fontWeight: '200'}}>Codigos para Imprimir</h3>
            <div className="button-and-input">
              <InputHolder
                value={codigos}
                onChange={setCodigos}></InputHolder>
              <button className='button-icono-plus'>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <br></br>
            <Button 
              iconin={faPrint} 
              titule='IMPRIMIR VARIOS'
              fontcolor='white'
              color='#1B75BA'
              hovercolor='#306A95'/>
          </div>
          <ListDisplay items={exampleList} />
        </div>
        <br></br>
        <div className="print-one">
          <div className="header-one">
            <h3 style={{fontWeight: '200'}}>Imprimir Bulto</h3>
            <div className="button-and-input">
              <InputHolder
                value={codigo}
                onChange={setCodigo}></InputHolder>
            </div>
          </div>
          <br></br>
          <div className="boton-print-one">
            <Button 
              iconin={faPrint} 
              titule='IMPRIMIR'
              fontcolor='white'
              color='#1B75BA'
              hovercolor='#306A95'/>
          </div>
          
        </div>
      </div>
      
    </PopUp>
  )
}

export default Imprimir