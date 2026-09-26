import React from "react";

// Labelled text input used across the forms. Extra props (min, max, disabled, autoComplete,
// required=false, ...) pass straight to the <input>.
export default function Input({
  type,
  placeholder,
  id,
  name,
  value,
  onChange,
  required = true,
  className = "",
  ...rest
}) {
  return (
    <label htmlFor={id} className={`flex w-full flex-col gap-1.5 ${className}`}>
      <span className="field-label">{name}</span>

      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="field"
        {...rest}
      />
    </label>
  );
}
