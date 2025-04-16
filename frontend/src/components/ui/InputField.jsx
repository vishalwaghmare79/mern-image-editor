import React from 'react';

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  placeholder = '',
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block text-white text-sm font-medium mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default InputField;
