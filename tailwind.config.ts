import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0d1a14',
          900: '#112218',
          800: '#173020',
          700: '#1f3d29',
          600: '#285232',
          500: '#336540',
        },
        sage: {
          DEFAULT: '#5c8f72',
          light: '#7db090',
          muted: '#a0c8b2',
          pale: '#c8e0d4',
          paler: '#e8f3ee',
        },
        amber: {
          DEFAULT: '#c8975a',
          light: '#ddb07a',
          warm: '#b8803f',
          glow: '#eecf94',
          muted: '#9e7040',
        },
        cream: {
          DEFAULT: '#f9f6ef',
          warm: '#f4eddc',
          dark: '#e8dfc8',
          muted: '#d4c9b0',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-2': '0.2em',
        'widest-3': '0.3em',
      },
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'draw-line': 'drawLine 2s ease forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.12)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
