/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#c9a227',
          light: '#e8d48a',
          dark: '#9a7b1a',
        },
        ink: {
          DEFAULT: '#0c1018',
          muted: '#5a6478',
          soft: '#1a2233',
        },
        surface: {
          DEFAULT: '#f4f6fb',
          warm: '#faf8f4',
        },
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(201, 162, 39, 0.45)',
        card: '0 4px 24px -4px rgba(12, 16, 24, 0.08)',
        'card-hover': '0 20px 50px -12px rgba(12, 16, 24, 0.18)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-light':
          'radial-gradient(at 20% 20%, rgba(201,162,39,0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(26,34,51,0.06) 0px, transparent 45%), radial-gradient(at 50% 100%, rgba(201,162,39,0.08) 0px, transparent 50%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'ken-burns': 'kenBurns 22s ease-in-out infinite alternate',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
        'marquee-ticker': 'marquee 95s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1.12)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
}
