/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // RISE Portal inspired palette
        primary: {
          DEFAULT: '#3b82f6',
          50:  '#eef5ff',
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        neon: '#00e4ff',
        // Portal-inspired surface colors
        surface: {
          950: '#0c0c0f',             // ultra dark like portal
          900: '#131419',             // main background
          800: '#1a1d24',             // card backgrounds
          700: '#252932',             // input backgrounds
          600: '#2f3349',             // borders
          500: '#4a5568',             // text muted
        },
        // Success green from portal
        success: {
          DEFAULT: '#10b981',
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669',
        },
        // Legacy colors for compatibility
        'rise-primary': '#3b82f6',
        'rise-secondary': '#8b5cf6',
        'rise-accent': '#06b6d4',
        zinc: {
          850: '#1c1c1f',
          950: '#09090b',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-display)', 'system-ui'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 24px 4px theme("colors.neon")',
        'glow-sm': '0 0 12px 2px theme("colors.neon")',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      animation: {
        glow: 'pulseGlow 3s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 12px theme("colors.neon")' },
          '50%':     { boxShadow: '0 0 24px theme("colors.neon")' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(circle at 30% 10%, #1f2937 0%, #0a0b0d 70%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}