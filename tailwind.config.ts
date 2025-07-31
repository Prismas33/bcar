import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0c0c0c',
        secondary: {
          50: '#f8f9fa',
          100: '#1c1c1e',
          200: '#2c2c2e',
          300: '#3a3a3c',
          400: '#48484a',
          500: '#636366',
        },
        accent: {
          gold: '#b8860b',
          'gold-light': '#daa520',
          'gold-dark': '#9d7209',
          platinum: '#e5e4e2',
          bronze: '#cd7f32',
          rose: '#e8b4b8',
        },
        luxury: {
          black: '#000000',
          charcoal: '#36454f',
          cream: '#f5f5dc',
          pearl: '#f8f6f0',
          midnight: '#191970',
        },
        text: {
          primary: '#ffffff',
          secondary: '#f5f5f5',
          subtle: '#d1d5db',
          muted: '#9ca3af',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #000000 0%, #191970 50%, #000000 100%)',
        'gradient-gold': 'linear-gradient(135deg, #b8860b 0%, #daa520 50%, #b8860b 100%)',
        'gradient-platinum': 'linear-gradient(135deg, #e5e4e2 0%, #f8f6f0 50%, #e5e4e2 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 50%, #1c1c1e 100%)',
        'gradient-hero': 'radial-gradient(ellipse at center, rgba(184,134,11,0.1) 0%, rgba(0,0,0,0.9) 70%)',
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(184, 134, 11, 0.4)',
        'luxury-hover': '0 35px 70px -12px rgba(184, 134, 11, 0.6)',
        'deep': '0 35px 60px -12px rgba(0, 0, 0, 0.9)',
        'glow': '0 0 30px rgba(184, 134, 11, 0.3)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(184, 134, 11, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
