import React from 'react'
import './Button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button({iconin,titule, onclick,color, hovercolor,bordercolor, fontcolor, height_btn}) {
  return (
      <button 
        onClick={onclick} 
        className='button-icon'
        style={{
            '--tcolor': color,
            '--thovcolor': hovercolor, 
            '--bcolor': bordercolor, 
            '--fcolor':fontcolor,
            height:height_btn,
            display: 'flex',
            alignItems: 'center'}}>
        <FontAwesomeIcon icon={iconin} />
        {titule}
      </button>
  )
}

export default Button