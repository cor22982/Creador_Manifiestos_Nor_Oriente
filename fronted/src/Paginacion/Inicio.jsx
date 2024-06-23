import React from 'react'
import Manifiesto from '../PopUps/Manifiesto/Manifiesto'
import useCode from '@hooks/useCode'
import Indice from './Indice/Indice';
function Inicio() {
  const { code } = useCode();
  return (
    <div>
      { code && code !== '' ? (
        <Indice></Indice>
      ) : (
        <Manifiesto/>
      )
      }
    </div>
  )
}

export default Inicio