import React from 'react';

const InputButton = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  styleClass,
  error,
}) => {
  return (
    <div className={`mt-8 ${styleClass}`}>
      <div className="text-sm font-bold leading-5 text-neutral-600">
        {label}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1.5 text-xs leading-5 text-neutral-600 text-opacity-30 border-b-2 w-full"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
export default InputButton;
