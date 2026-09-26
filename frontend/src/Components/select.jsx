import React from 'react'

// Labelled <select>. `value`, `id`, `required`, ... are optional and pass through.
export const Select = ({ children, title, onChange, id, className = "", ...rest }) => {
  return (
    <label htmlFor={id} className={`flex w-full flex-col gap-1.5 ${className}`}>
        <span className="field-label">{title}</span>
        <select id={id} onChange={onChange} className="field" {...rest}>
            {children}
        </select>
    </label>
  )
}
export const Option =({ children, value, ...rest })=>{
    return (
        <option value={value} {...rest}>
            {children}
        </option>
    )
}
export default Select
