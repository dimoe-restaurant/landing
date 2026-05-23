import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md px-6 py-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    primary: 'bg-foreground text-background hover:opacity-90',
    outline: 'border border-current bg-transparent hover:bg-foreground hover:text-background',
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
