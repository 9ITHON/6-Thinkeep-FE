import React, { useEffect } from 'react';

interface CustomInputProps {
  placeholder?: string;
  externalValue: string;  //외부에서 마이크를 통해 전달될 값, 없다면 ""로 전달
}

export const CustomInput = ({ placeholder = "마이크를 눌러 말해보세요", externalValue }: CustomInputProps) => {
  const [value, setValue] = React.useState("");

  useEffect(() => {
    setValue(externalValue);
  }, [externalValue]);

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`rounded-2xl bg-background w-3xs h-[10rem] p-4 break-words overflow-auto text-white text-lg placeholder-gray2 placeholder:text-lg`}
    />
  );
};

export default CustomInput;
