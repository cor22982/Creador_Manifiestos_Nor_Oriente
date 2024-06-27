import React, { useEffect, useState } from 'react';
import PopUp from '@components/PopUp';
import './Manifiesto.css'
import InputHolder from '@components/InputHolder';
import Button from '@components/Button';
import {faFile } from '@fortawesome/free-solid-svg-icons';
import useCode from '@hooks/useCode';
import useApi from '@hooks/useApi';
function Manifiesto() {
  const { setCode } = useCode();
  const { llamado } = useApi();
  const [showpop, setShowpop] = useState(true);
  const [codigo, setCodigo] = useState('');
  const fecha = new Date();

  const savecode = async () => {
    const body = { code: codigo };
    const { success } = await llamado(body, 'POST', 'http://127.0.0.1:8000/api/insert_manifest');
    if (success) {
      setCode(codigo);
    }
  };
  const fechaFormateada = fecha.toLocaleDateString();
  return (
    <PopUp trigger={showpop} setTrigger={setShowpop}>
      <div className='manifiesto-content'>
        <h2>MANIFIESTO</h2>
        <div className='contenido-codigos'>
          <div>
            <h3 className='titulo-popup'>Codigo Manifiesto</h3>
            <InputHolder
              value={codigo}
              onChange={setCodigo}></InputHolder>
          </div>
          <div>
            <h3 className='titulo-popup'>Fecha</h3>
            <h3 className='titulo-popup'>{fechaFormateada}</h3>
          </div>
        </div>
        <Button 
          iconin={faFile} 
          titule='IR AL MANIFIESTO'
          fontcolor='white'
          color='#1B75BA'
          hovercolor='#B0DAFA'
          onclick={savecode}></Button>
      </div>
    </PopUp>
  )
}

export default Manifiesto