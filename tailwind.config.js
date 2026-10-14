/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e8ff',
          200: '#c7d5ff',
          300: '#a4b8ff',
          400: '#7a93ff',
          500: '#5b6eff',
          600: '#4448f5',
          700: '#3339d8',
          800: '#2d2fb3',
          900: '#2a2a8f',
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        cream: {
          50: '#fafbff',
          100: '#f5f6ff',
          200: '#eff1ff',
        },
        charcoal: {
          900: '#0f172a',
          800: '#1e293b',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.75rem',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #5b6eff 0%, #8b5cf6 100%)',
        'gradient-subtle': 'linear-gradient(180deg, #f0f4ff 0%, #fafbff 100%)',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 25px -5px rgba(91, 110, 255, 0.15)',
        'button': '0 4px 15px rgba(91, 110, 255, 0.3)',
      }
    },
  },
  plugins: [],
}
