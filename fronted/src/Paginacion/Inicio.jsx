import React from 'react'
import Manifiesto from '../PopUps/Manifiesto/Manifiesto'
import useCode from '@hooks/useCode'
function Inicio() {
  const { code } = useCode();
  return (
    <div>
      { code && code !== '' ? (
        <h1>INICIO</h1>
      ) : (
        <Manifiesto/>
      )
      }
    </div>
  )
}

export default Inicio