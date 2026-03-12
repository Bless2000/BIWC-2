import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  loading = false, 
  icon: Icon,
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    danger: 'btn-danger',
    gold: 'btn-gold',
    ghost: 'btn-ghost',
    'outline-gold': 'btn-outline-gold border-[1.5px] border-gold-bright/50 text-gold-bright hover:bg-gold-pale hover:border-gold-bright',
    'outline-white': 'btn-outline-white border-[1.5px] border-white/40 text-white hover:bg-white/10 hover:border-white',
  };

  const sizes = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button 
      className={`btn ${variantClass} ${sizeClass} ${loading ? 'btn-loading' : ''} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />}
      {!loading && Icon && <Icon size={size === 'sm' ? 14 : 16} className="shrink-0" />}
      {children}
    </button>
  );
};

export default Button;
