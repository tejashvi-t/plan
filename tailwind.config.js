/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        calm: {
          50: '#f0f7fa',
          100: '#dceef3',
          200: '#b8dde6',
          300: '#85c4d4',
          400: '#51a5bb',
          500: '#35899f',
          600: '#2d7085',
          700: '#295c6d',
          800: '#284d5a',
          900: '#25424d',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e3ebe3',
          200: '#c8d7c9',
          300: '#a3bba5',
          400: '#7a9a7d',
          500: '#5a7d5e',
          600: '#466449',
          700: '#39503c',
          800: '#304233',
          900: '#29372b',
        },
      },
    },
  },
  plugins: [],
}
