import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './InputAutocompleted.css'
function InputAutocompleted({iconin, width_input,titule, height_input, font, options = ["Oranges", "Apples", "Pearls"]}) {
  const [value, setValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestions = options.filter(option => option.toString().toLowerCase().includes(value.toString().toLowerCase()))
    
    const autocompleteRef = useRef();

    useEffect(() => {
        const handleClick = (event) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
                setShowSuggestions(false)
            }
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    const handleChange = event => {
        setValue(event.target.value);
    }

    const handleSuggestionClick = (suggetion) => {
        setValue(suggetion);
        setShowSuggestions(false);
    }
  return (
    <div className="main-input" ref={autocompleteRef}>
            <input
                value={value}
                onChange={handleChange}
                placeholder=" "
                onFocus={() => setShowSuggestions(true)}
                style={{width: width_input, height: height_input,fontSize: font}}
            />
            <div className='icon-form'>
              <FontAwesomeIcon icon={iconin} />
            </div>
            <span className={value.length === 0 ? '' : 'fill'}>{titule}</span>
            {showSuggestions && (
                <ul className="suggestions">
                    {suggestions.map(suggestion => (
                        <li onClick={() => handleSuggestionClick(suggestion)} key={suggestion}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}

    </div>
  )
}

export default InputAutocompleted