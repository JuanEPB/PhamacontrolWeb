import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2351b6',
          600: '#113DC0',
          700: '#1e40af',
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
