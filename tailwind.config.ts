
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		// No `container` plugin config: the layout uses explicit gutters so display
		// type can break out of the text column while body copy stays measured.
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// `rule` is the hairline used for structure instead of card borders.
				rule: 'hsl(var(--rule))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			fontFamily: {
				sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
			},
			fontSize: {
				// Editorial scale: a wide range is what creates hierarchy here,
				// since the design uses almost no borders or fills.
				'label': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
				'meta': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
				'body': ['1.0625rem', { lineHeight: '1.65' }],
				'lead': ['clamp(1.125rem, 1.6vw, 1.375rem)', { lineHeight: '1.5' }],
				'statement': ['clamp(1.75rem, 3.4vw, 2.75rem)', { lineHeight: '1.18', letterSpacing: '-0.022em' }],
				'display': ['clamp(2.75rem, 7.2vw, 5.75rem)', { lineHeight: '0.98', letterSpacing: '-0.04em' }],
				'numeral': ['clamp(2rem, 4.4vw, 3.25rem)', { lineHeight: '1', letterSpacing: '-0.035em' }]
			},
			maxWidth: {
				'measure': '58ch',
				'shell': '88rem'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				// Deliberately small movement: editorial layouts read as considered,
				// not animated. 8px, not 40px.
				'rise': {
					from: { opacity: '0', transform: 'translateY(8px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				// 'both' fill-mode is required wherever animation-delay is used, or
				// delayed elements render visible during the delay and then flash out.
				'rise': 'rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
