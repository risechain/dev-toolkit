/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rise-primary': '#3b82f6',
        'rise-secondary': '#8b5cf6',
        'rise-accent': '#06b6d4',
        zinc: {
          850: '#1c1c1f',
          950: '#09090b',
        },
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
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
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}