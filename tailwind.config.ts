import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effaf6',
          100: '#d9f2e8',
          500: '#14a06f',
          600: '#0f8a61',
          700: '#0d6f51',
        },
        ink: '#17202a',
      },
      boxShadow: {
        soft: '0 18px 60px rgba(23, 32, 42, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config;
