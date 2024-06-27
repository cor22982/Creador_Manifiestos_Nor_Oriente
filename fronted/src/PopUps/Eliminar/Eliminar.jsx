import React from 'react'
import './Eliminar.css'
import PopUp from '@components/PopUp';
function Eliminar({activar, setActivar}) {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <h2>ELIMINAR</h2>
    </PopUp>
  )
}

export default Eliminar