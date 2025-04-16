import React from 'react';

const Button = ({ 
  type = 'button', 
  children, 
  onClick, 
  className = '', 
  width = 'full' 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-${width} py-2 px-4 text-white rounded-lg transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;