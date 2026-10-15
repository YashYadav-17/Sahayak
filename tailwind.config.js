/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#07131C",
        "deep-ink": "#111827",
        "primary-teal": "#0F766E",
        "bright-teal": "#14B8A6",
        "soft-cyan": "#67E8F9",
        canvas: "#F8FAFC",
        "mist-blue": "#DBEAFE",
        "violet-accent": "#8B5CF6",
        "app-border": "#E2E8F0",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 35px -5px rgba(20, 184, 166, 0.35)',
        'glow-cyan': '0 0 30px -5px rgba(103, 232, 249, 0.3)',
        'card-hover': '0 20px 30px -10px rgba(7, 19, 28, 0.08), 0 10px 15px -5px rgba(7, 19, 28, 0.04)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      }
    },
  },
  plugins: [],
}
