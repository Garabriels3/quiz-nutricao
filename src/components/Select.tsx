import React from 'react';

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, placeholder }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block appearance-none w-full bg-white border-2 border-purple-300 text-purple-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="py-2">
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple-700">
        <svg className="fill-current h-4 w-4 transition-transform duration-300 transform group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
};

export default Select;