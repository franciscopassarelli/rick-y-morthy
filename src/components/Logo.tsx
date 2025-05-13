
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl'
  };

  return (
    <Link to="/" className={`font-bold ${sizeClasses[size]} text-transparent bg-clip-text bg-gradient-to-tr from-rickgreen to-rickblue inline-block ${className}`}>
      Rick and Morty
    </Link>
  );
};

export default Logo;
