import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  href?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  disabled = false, 
  variant = 'primary', 
  children, 
  href, 
  fullWidth = false 
}) => {
  const baseClasses = 'px-6 py-3 rounded-md font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 flex justify-center items-center shadow-md';
  const variantClasses = {
    primary: 'bg-purple-400 text-white hover:bg-purple-500 focus:ring-purple-300',
    secondary: 'bg-pink-300 text-purple-700 hover:bg-pink-400 focus:ring-pink-200'
  };
  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;