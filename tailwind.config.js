/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem'
      },
      colors: {
        'text': '#061f32',
        'background': '#eee7e2',
        'primary': '#24366a',
        'secondary': '#95bcda',
        'accent': '#74acd8',
       },
       
    fontSize: {
      sm: '0.750rem',
      base: '1rem',
      xl: '1.333rem',
      '2xl': '1.777rem',
      '3xl': '2.369rem',
      '4xl': '3.158rem',
      '5xl': '4.210rem',
    },
    fontFamily:{
      'avenirNextRegular': ['AvenirNext', 'sans-serif'],
      'avenirNextBold': ['AvenirNextBold', 'sans-serif'],
      'avenirNextItalic': ['AvenirNextItalic', 'sans-serif']
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },},
  },
  plugins: [
    require('daisyui'),
  ],
}

