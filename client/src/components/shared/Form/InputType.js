import React from 'react'

const InputType = ({labelText,lableForm, inputType, value, onChange, name}) => {
  return (
    <>
        <div className="form-outline mb-4">
            <label className="form-label text-muted small fw-bold mb-1" htmlFor={lableForm} style={{ letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                {labelText}
            </label>
            <input 
                type={inputType} 
                name={name}
                value={value}
                onChange={onChange}
                id={lableForm}
                className="form-control form-control-glass" 
                placeholder={`Enter ${labelText}`}
            />
        </div>
    </>
  )
}

export default InputType