import React from 'react'
import PopUp from '@components/PopUp';
function Registrar({activar, setActivar}) {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <h2>REGISTRAR</h2>
    </PopUp>
  )
}

export default Registrar