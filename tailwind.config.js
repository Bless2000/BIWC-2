/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: 'var(--blue)',
          deep: 'var(--blue-deep)',
          mid: 'var(--blue-mid)',
          light: 'var(--blue-light)',
        },
        gold: {
          DEFAULT: 'var(--gold)',
          bright: 'var(--gold-bright)',
          pale: 'var(--gold-pale)',
        },
        red: {
          DEFAULT: 'var(--red)',
          bright: 'var(--red-bright)',
        },
        bg: {
          DEFAULT: 'var(--bg)',
          alt: 'var(--bg2)',
        },
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        italic: 'var(--font-italic)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
        xs: 'var(--radius-xs)',
      },
      backdropBlur: {
        glass: '20px',
        'glass-sm': '10px',
      }
    },
  },
  plugins: [],
}
