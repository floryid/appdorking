/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cyberpunk theme colors
        primary: {
          DEFAULT: '#00f5d4',
          light: '#7DF9FF',
          dark: '#00B3A4',
        },
        secondary: {
          DEFAULT: '#f20089',
          light: '#FF2A99',
          dark: '#B2006A',
        },
        tertiary: {
          DEFAULT: '#7209b7',
          light: '#9331D0',
          dark: '#5A078F',
        },
        cyber: {
          black: '#020617',
          darkblue: '#0f172a',
          danger: '#ff2a6d',
          success: '#05ffa1',
          warning: '#ffbd00',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 5px theme("colors.cyan.400"), 0 0 20px theme("colors.cyan.600")',
        'neon-fuchsia': '0 0 5px theme("colors.fuchsia.400"), 0 0 20px theme("colors.fuchsia.600")',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};