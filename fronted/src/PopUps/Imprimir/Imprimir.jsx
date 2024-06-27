import React from 'react'
import './Imprimir.css'
import PopUp from '@components/PopUp';
function Imprimir({activar, setActivar}) {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <h2>IMPRIMIR</h2>
    </PopUp>
  )
}

export default Imprimir