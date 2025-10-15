/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#0a192f',
          light: '#112240',
          lighter: '#1d3557',
        },
        accent: {
          cyan: '#64ffda',
          blue: '#00d4ff',
          light: '#8af3ff',
        },
        text: {
          primary: '#ccd6f6',
          secondary: '#8892b0',
          highlight: '#e6f1ff',
        },
        lightMode: {
          bg: '#f8f9fa',
          surface: '#ffffff',
          surfaceAlt: '#f0f2f5',
          border: '#e1e4e8',
          text: {
            primary: '#1a202c',
            secondary: '#4a5568',
            muted: '#718096',
          }
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
