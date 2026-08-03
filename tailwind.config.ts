import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			'roboto-black': ["'Roboto-Black', sans-serif"],
  			hand: ['var(--font-hand)', 'cursive'],
  			marker: ['var(--font-marker)', 'cursive'],
  			body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  		},
  		colors: {
  			wood: {
  				'900': '#241811',
  				'800': '#2B1D13',
  				'700': '#4A3224',
  				'600': '#7A5230',
  				'500': '#9c6b3f',
  				'300': '#D8B98A',
  				'200': '#E8D4B4',
  				'100': '#F5E8D3',
  			},
  			ember: {
  				DEFAULT: '#FF8A00',
  				soft: '#FFB454',
  				deep: '#D96E00',
  			},
  			paper: {
  				DEFAULT: '#F5E8D3',
  				aged: '#EAD9BC',
  				sticky: '#F2D98A',
  				stickyPink: '#F0B7A6',
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			wave: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'10%': {
  					transform: 'rotate(14deg)'
  				},
  				'20%': {
  					transform: 'rotate(-8deg)'
  				},
  				'30%': {
  					transform: 'rotate(14deg)'
  				},
  				'40%': {
  					transform: 'rotate(0deg)'
  				},
  				'45%': {
  					transform: 'rotate(0deg)'
  				},
  				'50%': {
  					transform: 'rotate(0deg)'
  				},
  				'60%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(0deg)'
  				}
  			},
  			wiggle: {
  				'0%,100%': { transform: 'rotate(-2deg)' },
  				'50%': { transform: 'rotate(2deg)' },
  			},
  			'lamp-flicker': {
  				'0%,100%': { opacity: '1' },
  				'92%': { opacity: '1' },
  				'94%': { opacity: '0.82' },
  				'96%': { opacity: '1' },
  				'98%': { opacity: '0.9' },
  			},
  			'dust-rise': {
  				'0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
  				'10%': { opacity: '0.6' },
  				'90%': { opacity: '0.4' },
  				'100%': { transform: 'translateY(-120px) translateX(20px)', opacity: '0' },
  			},
  			'fade-up': {
  				'0%': { opacity: '0', transform: 'translateY(16px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' },
  			},
  		},
  		animation: {
  			wave: 'wave 10s ease-in-out infinite',
  			wiggle: 'wiggle 2.5s ease-in-out infinite',
  			'lamp-flicker': 'lamp-flicker 6s ease-in-out infinite',
  			'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
  		},
  		boxShadow: {
  			paper: '0 1px 2px rgba(0,0,0,0.25), 0 8px 24px -8px rgba(0,0,0,0.55)',
  			'paper-lift': '0 4px 8px rgba(0,0,0,0.3), 0 24px 48px -12px rgba(0,0,0,0.6)',
  			drawer: 'inset 0 1px 0 rgba(255,220,170,0.08), 0 2px 6px rgba(0,0,0,0.5)',
  			glow: '0 0 24px 2px rgba(255,138,0,0.35)',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
