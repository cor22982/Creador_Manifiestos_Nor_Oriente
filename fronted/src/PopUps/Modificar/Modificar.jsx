import React from 'react'
import './Modificar.css'
import PopUp from '@components/PopUp';
function Modificar({activar, setActivar}) {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <h2>MODIFICAR</h2>
    </PopUp>
  )
}

export default Modificar