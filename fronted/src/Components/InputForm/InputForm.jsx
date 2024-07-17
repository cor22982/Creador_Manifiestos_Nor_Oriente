
import './InputForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function InputForm({ iconin, width_input,titule, height_input, font, type, value, onChange }) {
  

  return (
    <div>
      <div className='main-input'>
        <input
          type={type}
          value={value}
          onChange={({ target: { value }}) => onChange(value)}
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

export default InputForm;
