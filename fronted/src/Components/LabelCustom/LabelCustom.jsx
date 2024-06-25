import React from 'react'
import './LabelCustom.css'
function LabelCustom({titule, simbol}) {
  return (
    <div className='contenido-label'>
      <div className="simbolo">{simbol}</div>
      <h4 className='titulo-label'>{titule}</h4>
    </div>
  )
}

export default LabelCustom