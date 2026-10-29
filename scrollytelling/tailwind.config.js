/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0A0A0C',
        sonyBlue: '#0050FF',
        electricCyan: '#00D6FF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #0050FF 0%, #00D6FF 100%)',
        'hero-radial': 'radial-gradient(ellipse at center, #050815 0%, #050505 70%)',
      },
    },
  },
  plugins: [],
};
