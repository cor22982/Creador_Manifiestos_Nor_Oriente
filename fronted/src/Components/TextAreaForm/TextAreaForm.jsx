import React, { useState } from 'react';
import './TextAreaForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TextAreaForm({ iconin, value, onChange }) {
 
  return (
    <div>
      <div className='main-textarea'>
        <textarea
          value={value}
          onChange={({ target: { value }}) => onChange(value)}
          placeholder=" " /* Add placeholder to ensure CSS effect works */
        />
        <div className='icon-form'>
          <FontAwesomeIcon icon={iconin} />
        </div>
        <span className={value.length === 0 ? '' : 'fill'}>Descripcion</span>
      </div>
    </div>
  );
}

export default TextAreaForm;
