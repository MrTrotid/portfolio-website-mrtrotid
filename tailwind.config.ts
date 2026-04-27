import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#0d1015',
        ink: '#f3f3f0',
        muted: '#a8adb7',
        line: '#252a33',
        soft: '#181d26',
        accent: '#bfc7d6',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 12px 50px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
