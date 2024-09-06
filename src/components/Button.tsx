import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  background-color: ${({ variant, primaryColor, secondaryColor }) => 
    variant === 'secondary' ? secondaryColor : primaryColor};
  color: ${({ textColor }) => textColor};

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  fullWidth = false,
  primaryColor = '#3498db',
  secondaryColor = '#2ecc71',
  textColor = '#ffffff',
  ...rest
}) => {
  return (
    <StyledButton 
      as="button"
      variant={variant}
      fullWidth={fullWidth}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      textColor={textColor}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;