import React, { useRef } from 'react';
import './TextInput.scss';

const TextInput = ({
  value,
  name,
  id,
  type,
  pattern,
  placeholder,
  label,
  onChange,
  className,
  required,
  onInvalid
}) => {
  let ref = useRef(null);
  if(ref.current && onInvalid) {
    let element = ref.current;
    
    element.addEventListener("input", (event) => {
      if(element.validity.patternMismatch) {
        element.setCustomValidity(onInvalid);
      } else {
        element.setCustomValidity("");
      }
    });
  }

  return (
    <div className={`TextInput${className ? ' ' + className : ''}`}>
      <input
        ref={ref}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder} 
        value={value}
        className='input'
        onChange={onChange}
        pattern={pattern ? pattern : null}
        required={required} />
      <span className="animation-border-bottom"></span>
      <label
        htmlFor={id}
        className='label'>
        {label}
      </label>
    </div>
  )
}

export default TextInput;