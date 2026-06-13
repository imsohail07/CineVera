/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0F1117',
        sidebar: '#161B22',
        surface: '#1B2028',
        card: '#222933',
        border: 'rgba(255,255,255,0.08)',
        accent: {
          DEFAULT: '#FF9900',
          hover: '#E68900',
          dim: 'rgba(255,153,0,0.15)',
        },
        blue: {
          accent: '#4F6B95',
          light: '#7AA2F7',
          dim: 'rgba(79,107,149,0.15)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#AAB2BF',
          muted: '#5C6470',
        },
        success: '#2ECC71',
        warning: '#FFB020',
        error: '#E5534B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.4)',
        elevated: '0 4px 16px rgba(0,0,0,0.5)',
        modal: '0 8px 32px rgba(0,0,0,0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.97)' }, to: { opacity: '1', transform: 'scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}
