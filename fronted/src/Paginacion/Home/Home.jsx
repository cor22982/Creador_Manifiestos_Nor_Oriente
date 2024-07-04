import React, { useState, useEffect, useRef } from 'react';
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
import { useReactToPrint } from "react-to-print";
import BauncherList from '../../Components/Bauncher/Baunchers/BauncherList';
function Home() {
  const { code } = useCode();
  const { llamadowithoutbody } = useApi();
  const { llamado } = useApi();
  const [headerData, setHeaderData] = useState({});
  const fecha = new Date();
  const fechaFormateada = fecha.toLocaleDateString();
  const [popupState, setPopupState] = useState({ modificar: false, eliminar: false, imprimir: false, registrar: false });
  const togglePopup = (popup) => setPopupState({ ...popupState, [popup]: !popupState[popup] });
  const [codigo, setCodigo] = useState(localStorage.getItem('codigo') || '');
  const [infoCodigo, setInfoCodigo] = useState({});
  const [codigos, setCodigos] = useState('');
  const [codeList, setCodeList] = useState([]);
  const [infoList, setInfoList] = useState([]);

  useEffect(() => {
    localStorage.setItem('codigo', codigo);
  }, [codigo]);

  const setInfo = async () => {
    try {
      if (codigo) {
        const data = await llamadowithoutbody('GET', `http://127.0.0.1:8000/api/printone/${codigo}`);
        setInfoCodigo(data);
      }
    } catch {
      console.log("no se obtuvo");
    }
  };

  useEffect(() => {
    setInfo();
  }, [codigo]);

  const calldata = async () => {
    const respuesta = await llamadowithoutbody('GET', 'http://127.0.0.1:8000/api/data');
    setHeaderData(respuesta);
  };

  useEffect(() => {
    calldata();
  }, []);

  const dataGenerate = () => {
    if (headerData && headerData.no !== undefined) {
      DocGenerator(headerData);
    } else {
      console.error('El valor de headerData.no es indefinido o no válido.');
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const handlePrintTwice = async () => {
    await setInfo();
    await handlePrint();
    setTimeout(async () => {
      await handlePrint();
    }, 1000);
  };

  //printlist
  const component2Ref = useRef();
  const handlePrintList = useReactToPrint({
    content: () => component2Ref.current
  });

  const getPackages = async () => {
    const body = { hawb_codes: codeList };
    const { packages } = await llamado(body, 'POST', 'http://127.0.0.1:8000/api/printlist');
    setInfoList(packages);
  };

  useEffect(() => {
    if (codeList.length > 0) {
      getPackages();
    }
  }, [codeList]);

  const printlist = async () => {
    try {
      await getPackages();
      await handlePrintList();
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="total">
      <div className="bauncher-print">
        <Bauncher 
          ref={componentRef} 
          className="bauncher-print" 
          info={infoCodigo} />
      </div>
      <div className="bauncher-print">
        <BauncherList
          list={infoList}
          ref={component2Ref}></BauncherList>
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
        <button className='icono-boton-home' onClick={dataGenerate}>
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
      <br></br>
      <div className="contenido-factura">
        <h1 className='codigo'>Codigo: { codigo || '' }</h1>
        {[
          ['Envia:', infoCodigo?.envia || ''],
          ['Direccion:', infoCodigo?.direccion_envia || ''],
          ['Recibe:', infoCodigo?.recibe || ''],
          ['Direccion Recibe:', infoCodigo?.direccion_recibe || '']
        ].map(([label, info], index) => (
          <div key={index} className="label-contenido">
            <p className='label-name'>{label}</p>
            <p className='label-info'>{info}</p>
          </div>
        ))}
        <div className="telefono-fecha">
          <div className="label-contenido">
            <p className='label-name'>Telefono:</p>
            <p className='label-info'>{infoCodigo?.telefono_recibe || ''}</p>
          </div>
          <div className="label-contenido">
            <p className='label-name'>Fecha:</p>
            <p className='label-info'>{fechaFormateada}</p>
          </div>
        </div>
        <div className="contenedor-grande">
          {[
            ['Tipo', infoCodigo?.tipo || ''],
            ['Contenido', infoCodigo?.contenido?.toUpperCase() || ''],
            ['Peso(Lb)', infoCodigo?.peso || ''],
            ['Bulto', infoCodigo?.bulto || '']
          ].map(([titulo, contenido], index) => (
            <div key={index} className="label-grande">
              <p className='titulo-grande'>{titulo}</p>
              <p className='contenido-grande'>{contenido}</p>
            </div>
          ))}
        </div>
        <div className="butoon-contenido">
          {[
            ['Atendido por:', infoCodigo?.ciudad_envia || ''],
            ['Oficina:', infoCodigo?.atendido?.toUpperCase() || '']
          ].map(([label, info], index) => (
            <div key={index} className="label-contenido">
              <p className='label-name'>{label}</p>
              <p className='label-info'>{info}</p>
            </div>
          ))}
          <button className='icono-boton-print' onClick={handlePrintTwice}>
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
      <Imprimir 
        activar={popupState.imprimir} 
        setActivar={() => togglePopup('imprimir')} 
        codigo={codigo}
        setCodigo={setCodigo}
        sendtoPrint={handlePrintTwice}
        codigos={codigos}
        setCodigos={setCodigos}
        codeList={codeList}
        setCodeList={setCodeList}
        printList={printlist}/>
      <Registrar activar={popupState.registrar} setActivar={() => togglePopup('registrar')} />
    </div>
  );
}

export default Home;
