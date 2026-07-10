/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
        display: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        accent: {
          DEFAULT: '#0071e3',
          hover: '#0077ed',
          dark: '#0066cc',
        },
        gold: {
          DEFAULT: '#b8860b',
          light: '#d4a843',
          dark: '#8b6914',
        },
        ink: {
          DEFAULT: '#1d1d1f',
          muted: '#6e6e73',
          soft: '#424245',
          faint: '#86868b',
        },
        surface: {
          DEFAULT: '#f5f5f7',
          warm: '#fbfbfd',
          elevated: '#ffffff',
        },
        line: {
          DEFAULT: 'rgba(0,0,0,0.08)',
          strong: 'rgba(0,0,0,0.12)',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0,0,0,0.04), 0 2px 12px rgba(0,0,0,0.06)',
        card: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 2px 8px rgba(0,0,0,0.06), 0 8px 28px rgba(0,0,0,0.08)',
        header: '0 1px 0 rgba(0,0,0,0.06)',
      },
      backgroundImage: {
        'mesh-light': 'none',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'marquee-ticker': 'marquee 100s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
}
