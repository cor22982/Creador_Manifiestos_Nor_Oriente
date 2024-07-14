import { useState } from 'react';
import './Checkbox.css'
function Checkbox({name, onpress, pressed, setPressed}) {
  const handleClick = () => {
    setPressed(!pressed); // Cambiar el estado de presionado
    if(!pressed){
      onpress()
    }
  };
  return (
    <div className='checkbox-container'>
      <button 
        className= {pressed ? 'button-checkbox-click' : 'button-checkbox' } 
        onClick={handleClick}></button>
      <p className='titulo-checkbox'>{name}</p>
    </div>
  )
}

export default Checkbox