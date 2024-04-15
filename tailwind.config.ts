import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        ihtAVo: {
          '0%, 25%': { transform: 'translateX(3px) rotate(1deg)' },
          '2.5%': { transform: 'translateX(-3px) rotate(-1deg)' },
          '5%': { transform: 'translateX(3px) rotate(1deg)' },
          '7.5%': { transform: 'translateX(-3px) rotate(-1deg)' },
          '10%': { transform: 'translateX(2px) rotate(1deg)' },
          '12.5%': { transform: 'translateX(-2px) rotate(-1deg)' },
          '15%': { transform: 'translateX(2px) rotate(1deg)' },
          '17.5%': { transform: 'translateX(-2px) rotate(-1deg)' },
          '20%': { transform: 'translateX(1px) rotate(1deg)' },
          '22.5%': { transform: 'translateX(-1px) rotate(-1deg)' },
          '25%': { transform: 'translateX(0px) rotate(0deg)' },
        }
      },
      animation: {
        ihtAVo: 'ihtAVo 3s linear 0s infinite normal none running',
      }
    },
  },
  plugins: [],
}
export default config
