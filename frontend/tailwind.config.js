/** @type {import('tailwindcss').Config} */
import animatePlugin from "tailwindcss-animate";
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			yellow: {
    				rich: '#FFD60A'
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
    			bounce: {
    				'0%, 100%': {
    					transform: 'translateY(0)'
    				},
    				'50%': {
    					transform: 'translateY(-15px)'
    				}
    			},
    			bounce2: {
    				'0%, 100%': {
    					transform: 'translateX(0)'
    				},
    				'50%': {
    					transform: 'translateX(-15px)'
    				}
    			},
    			curve: {
    				'0%': {
    					transform: 'translateX(0) translateY(0)'
    				},
    				'50%': {
    					transform: 'translateX(10px) translateY(-10px)'
    				},
    				'100%': {
    					transform: 'translateX(0) translateY(0)'
    				}
    			},
    			curveMove: {
    				'0%': {
    					transform: 'translateX(-700px) translateY(400px) rotate(10deg)'
    				},
    				'100%': {
    					transform: 'translateX(0) translateY(0) rotate(-30deg)'
    				}
    			},
    			curveMove2: {
    				'0%': {
    					transform: 'translateX(-700px) translateY(400px) rotate(10deg)'
    				},
    				'100%': {
    					transform: 'translateX(0) translateY(0) rotate(-10deg)'
    				}
    			},
    			fadeIn: {
    				'0%': {
    					opacity: '0'
    				},
    				'100%': {
    					opacity: '1'
    				}
    			},
    			popup: {
    				'0%': {
    					opacity: '0',
    					transform: 'scale(0.9)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'scale(1)'
    				}
    			},
    			shine: {
    				'0%': {
    					'background-position': '0% 0%'
    				},
    				'50%': {
    					'background-position': '100% 100%'
    				},
    				to: {
    					'background-position': '0% 0%'
    				}
    			},
    			'border-beam': {
    				'100%': {
    					'offset-distance': '100%'
    				}
    			}
    		},
    		animation: {
    			bounce: 'bounce 2s ease-in-out 0.5s infinite ',
    			bounce2: 'bounce2 2s ease-in-out 0.5s infinite ',
    			curve: 'curve 2s ease-in-out 0.5s infinite ',
    			curveMove: 'curveMove 1.5s ease-in-out forwards',
    			curveMove2: 'curveMove2 1.5s ease-in-out forwards',
    			fadeIn: 'fadeIn 2s ease-in-out forwards',
    			popup: 'popup 2s ease-in-out',
    			shine: 'shine var(--duration) infinite linear',
    			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear'
    		}
    	}
    },
	plugins: [animatePlugin],
}

