import React, { useState, useEffect } from 'react';
import './Home.css';
import useCode from '@hooks/useCode';
import LabelCustom from '@components/LabelCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPrint, faFilePen, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '@components/Button';
import Modificar from '@popups/Modificar';
import Eliminar from '@popups/Eliminar';
import Imprimir from '@popups/Imprimir'; 
import Registrar from '@popups/Registrar';
import useApi from '@hooks/useApi';
import DocGenerator from './DocGenerator/DocGenerator';
import Bauncher from '../../Components/Bauncher/Bauncher';
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function Home() {
  const { code } = useCode();
  const { llamadowithoutbody } = useApi();
  const [headerData, setHeaderData] = useState({});
  const fecha = new Date();
  const fechaFormateada = fecha.toLocaleDateString();
  const [popupState, setPopupState] = useState({ modificar: false, eliminar: false, imprimir: false, registrar: false });
  const togglePopup = (popup) => setPopupState({ ...popupState, [popup]: !popupState[popup] });
  const calldata = async () => {
    const respuesta = await llamadowithoutbody('GET', 'http://127.0.0.1:8000/api/data');
    setHeaderData(respuesta);
  }

  useEffect(() => {    
    calldata();
  }, [])

  const dataGenerate = () => {
    if (headerData && headerData.no !== undefined) {
      DocGenerator(headerData);
    } else {
      console.error('El valor de headerData.no es indefinido o no válido.');
      // Puedes mostrar un mensaje de error o manejar de otra manera el caso de datos no válidos.
    }
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  

  return (
    <div className="total">
      <div style={{display: 'none'}}>
        <Bauncher ref={componentRef}></Bauncher>
      </div>
      
      <div className="titulos">
        <h2 className='titulo-pagina'>CREACION DE BULTOS</h2>
        <h2 className='titulo-pagina' style={{ fontSize: '20px' }}>{'202 - ' + code}</h2>
      </div>
      <div className="linea"></div>
      <br></br>
      <div className="informacion">
        {[headerData.no, headerData.kg, headerData.frios, headerData.seco, headerData.lb].map((value, index) => (
          <LabelCustom key={index} titule={value} simbol={['No', 'KG', 'Frios', 'Secos', 'LB'][index]} />
        ))}
        <button className='icono-boton-home'
          onClick={dataGenerate}>
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
      <br></br>
      <div className="contenido-factura">
        <h1 className='codigo'>Codigo: 1000A</h1>
        {[
          ['Envia:', 'MATHEW ALEXANDER CORDERO AQUINO'],
          ['Direccion:', '20 CALLE Y 13 AVENIDA ZONA 0'],
          ['Recibe:', 'BLANCA BERGANZA'],
          ['Direccion Recibe:', '1 MAPLE ST NEW YORK HILLS NY 10080']
        ].map(([label, info], index) => (
          <div key={index} className="label-contenido">
            <p className='label-name'>{label}</p>
            <p className='label-info'>{info}</p>
          </div>
        ))}
        <div className="telefono-fecha">
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
          {[
            ['Tipo', 'SECO'],
            ['Contenido', 'BREAD,CHEESE,TAMALITOS,CONDIMENTS,COOKED VEGETABLES , BREAD , JAMON'],
            ['Peso(Lb)', '55'],
            ['Bulto', '1']
          ].map(([titulo, contenido], index) => (
            <div key={index} className="label-grande">
              <p className='titulo-grande'>{titulo}</p>
              <p className='contenido-grande'>{contenido}</p>
            </div>
          ))}
        </div>
        <div className="butoon-contenido">
          {[
            ['Atendido por:', 'CHIQUIMULA - GUATEMALA'],
            ['Oficina:', 'JACKELINE']
          ].map(([label, info], index) => (
            <div key={index} className="label-contenido">
              <p className='label-name'>{label}</p>
              <p className='label-info'>{info}</p>
            </div>
          ))}
          <button className='icono-boton-print'
              onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>
      </div>
      <br></br>
      <div className="buttons-container">
        {[
          { icon: faPrint, title: 'IMPRIMIR', fontColor: 'white', color: '#0090FF', hoverColor: '#1B75BA', funcion: () => togglePopup('imprimir') },
          { icon: faFilePen, title: 'REGISTRAR', fontColor: 'white', color: '#1B75BA', hoverColor: '#1B75BA', funcion: () => togglePopup('registrar') },
          { icon: faPen, title: 'MODIFICAR', fontColor: '#1B75BA', color: '#DBECF9', hoverColor: '#1B75BA', borderColor: '#07395E', funcion: () => togglePopup('modificar') },
          { icon: faTrash, title: 'ELIMINAR', fontColor: '#07395E', color: 'white', hoverColor: '#1B75BA', borderColor: '#07395E', funcion: () => togglePopup('eliminar') }
        ].map((buttonProps, index) => (
          <Button 
            key={index} 
            iconin={buttonProps.icon} 
            titule={buttonProps.title}
            onclick={buttonProps.funcion} 
            fontcolor={buttonProps.fontColor} 
            color={buttonProps.color} 
            hovercolor={buttonProps.hoverColor} 
            bordercolor={buttonProps.borderColor} />
        ))}
      </div>
      <Modificar activar={popupState.modificar} setActivar={() => togglePopup('modificar')} />
      <Eliminar activar={popupState.eliminar} setActivar={() => togglePopup('eliminar')} />
      <Imprimir activar={popupState.imprimir} setActivar={() => togglePopup('imprimir')} />
      <Registrar activar={popupState.registrar} setActivar={() => togglePopup('registrar')} />
      
    </div>
  );
}

export default Home;
