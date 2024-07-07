import React, { useState } from 'react';
import './TextAreaForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TextAreaForm({ iconin }) {
  const [value, setValue] = useState('');

  return (
    <div>
      <div className='main-textarea'>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
