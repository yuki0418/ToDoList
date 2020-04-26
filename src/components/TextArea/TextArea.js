import React from 'react';
import './TextArea.scss';

const TextArea = ({
  value,
  name,
  id,
  rows,
  placeholder,
  label,
  onChange,
  className
}) => {
  return (
    <div className={`TextArea${className ? ' ' + className : ''}`}>
      <label 
        htmlFor={id}
        className='label'>
          {label}
      </label>
      <textarea 
        className='text-area'
        id={id} 
        name={name} 
        rows={rows || 10} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}>
      </textarea>
    </div>
  )
}

export default TextArea;