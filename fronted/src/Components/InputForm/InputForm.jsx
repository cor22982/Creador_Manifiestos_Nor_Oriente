import React, { useState } from 'react';
import './InputForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function InputForm({ iconin, width_input,titule, height_input, font, type }) {
  const [value, setValue] = useState('');

  return (
    <div>
      <div className='main-input'>
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder=" "
          style={{width: width_input, height: height_input,fontSize: font}}
        />
        <div className='icon-form'>
          <FontAwesomeIcon icon={iconin} />
        </div>
        <span className={value.length === 0 ? '' : 'fill'}>{titule}</span>
      </div>
    </div>
  );
}

InputForm.defaultProps = {
  height_input: '30px' 
};
export default InputForm;
