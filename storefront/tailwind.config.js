/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f0f11',
          light: '#ffffff',
          surface: '#f8f8fa',
          border: '#e5e7eb',
          subtle: '#6b7280',
          terracotta: '#a04508',
          gold: '#d4af37',
          goldDark: '#845401',
        }
      },
      fontFamily: {
        bounded: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        impact: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-1deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeFast: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        floatReverse: 'floatReverse 6s ease-in-out infinite',
        marquee: 'marquee 22s linear infinite',
        marqueeFast: 'marqueeFast 14s linear infinite',
      }
    },
  },
  plugins: [],
}