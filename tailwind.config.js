const textShadow = require('tailwindcss-textshadow');


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind scans all your files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        
      },
      colors: {  
        'the-gray': '#daeae5',
        'apple-light' : '#EDEDF0',
        'apple-dark': '#6E6E73',
        'apple-title':'#1D1D20'
      },
      
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.05)',
        default: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        md: '3px 3px 6px rgba(0, 0, 0, 0.15)',
        lg: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        xl: '5px 5px 10px rgba(0, 0, 0, 0.3)',
        blueGlow: '0 0 8px rgba(92, 122, 208, 0.5)',
        redGlow: '0 0 8px rgba(240, 91, 94, 0.5)',
      },
      animation: {
        'fast-pulse': 'pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [textShadow],
};
