import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'luxury' | 'premium' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  children: ReactNode;
  withShine?: boolean;
  withGlow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading, 
    children, 
    withShine = false,
    withGlow = false,
    ...props 
  }, ref) => {
    const baseClasses = 'relative inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-500 transform focus:outline-none focus:ring-2 focus:ring-accent-gold/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 overflow-hidden';
    
    const variants = {
      primary: 'bg-gradient-to-r from-accent-gold via-accent-gold-light to-accent-gold text-luxury-black shadow-luxury hover:shadow-luxury-hover border border-accent-gold/30',
      secondary: 'bg-transparent hover:bg-accent-gold/10 text-text-primary border-2 border-accent-gold hover:border-accent-gold-light backdrop-blur-md',
      outline: 'border-2 border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-luxury-black shadow-inner-glow hover:shadow-glow',
      ghost: 'text-text-primary hover:bg-white/10 backdrop-blur-sm',
      luxury: 'bg-gradient-to-r from-accent-gold via-accent-gold-light to-accent-gold text-luxury-black font-bold shadow-luxury hover:shadow-glow border border-accent-gold/50',
      premium: 'bg-gradient-to-br from-accent-platinum to-accent-gold text-luxury-black font-bold shadow-luxury hover:shadow-luxury-hover',
      glass: 'bg-white/10 backdrop-blur-xl border border-white/20 text-text-primary hover:bg-white/20 shadow-deep',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-12 py-6 text-xl',
    };

    const ButtonComponent = (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          withGlow && 'animate-glow',
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {/* Shine Effect */}
        {(withShine || variant === 'luxury' || variant === 'premium') && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-1000 group-hover:translate-x-full" />
        )}
        
        {/* Loading Spinner */}
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        )}
        
        {/* Content */}
        <span className="relative z-10 flex items-center">
          {children}
        </span>
        
        {/* Glow Background */}
        {withGlow && (
          <div className="absolute inset-0 bg-accent-gold/20 rounded-lg blur-xl -z-10" />
        )}
      </button>
    );

    // Wrap with motion if it's a luxury variant
    if (variant === 'luxury' || variant === 'premium') {
      return (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block group"
        >
          {ButtonComponent}
        </motion.div>
      );
    }

    return ButtonComponent;
  }
);

Button.displayName = 'Button';

export { Button };
