/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0C',
        foreground: '#F5F5F5',
        brand: {
          orange: '#FF6A1A',
          amber: '#F59E0B',
          green: '#3DDC84',
          emerald: '#10B981',
          dark: '#0B0B0C',
          card: 'rgba(255, 255, 255, 0.035)',
          border: 'rgba(255, 255, 255, 0.09)',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        '24': '24px',
        '3xl': '24px',
      },
      boxShadow: {
        'glow-orange': '0 0 35px -5px rgba(255, 106, 26, 0.45)',
        'glow-green': '0 0 35px -5px rgba(61, 220, 132, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
