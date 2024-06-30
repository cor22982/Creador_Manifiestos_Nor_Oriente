import React, { useEffect, useState } from 'react';
import './Imprimir.css'
import PopUp from '@components/PopUp';
import InputHolder from '@components/InputHolder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import Button from '@components/Button';
import ListDisplay from '../../Components/ListDisplay/ListDisplay';
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function Imprimir({activar, setActivar}) {
  const [codigos, setCodigos] = useState('');
  const [codigo, setCodigo] = useState('');
  const [codeList, setCodeList] = useState([]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const addCodeToList = () => {
    if (codigos.trim() !== '') {
      setCodeList([...codeList, codigos]);
      setCodigos(''); // Limpiar el input después de agregar el código
    }
  };

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
              <button 
                className='button-icono-plus'
                onClick={addCodeToList}>
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
          <ListDisplay items={codeList} />
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
              hovercolor='#306A95'
              onclick={handlePrint}/>
          </div>
          
        </div>
      </div>
      
    </PopUp>
  )
}

export default Imprimir