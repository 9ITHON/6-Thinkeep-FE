import React from 'react';

interface CustomInputProps {
  size: 'small' | 'medium' | 'large';
  borderStyle: 'solid' | 'dashed' | 'none';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  additionalStyles?: string;
  isDisabled?: boolean;
}

const CustomInput = ({
  size,
  borderStyle,
  placeholder,
  value,
  onChange,
  additionalStyles,
  isDisabled,
}: CustomInputProps) => {
    
  const sizeClasses = {
    small: 'p-1 text-sm',
    medium: 'p-2 text-base',
    large: 'p-3 text-lg',
  };

  const borderClasses = {
    solid: 'border border-gray-300',
    dashed: 'border-2 border-dashed border-gray-300',
    none: 'border-none',
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
      className={`rounded-md ${sizeClasses[size]} ${borderClasses[borderStyle]} focus:outline-none focus:ring-2 focus:ring-blue-500 ${additionalStyles}`}
    />
  );
};

export default CustomInput;
