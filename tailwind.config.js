import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Laravel Blade templates and pagination views
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    // React JSX, JS, TS, and TSX files
    './resources/js/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Custom colors for Support component and shadcn/ui
        blue: {
          400: '#60a5fa',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2a44',
        },
        green: {
          600: '#16a34a',
        },
        red: {
          600: '#dc2626',
          800: '#991b1b',
        },
        // shadcn/ui CSS variables (aligned with new-york style, zinc base)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      spacing: {
        18: '4.5rem', // For mb-18 if needed
      },
      borderRadius: {
        // Align with shadcn/ui's default radius
        DEFAULT: 'var(--radius)',
      },
    },
  },

  darkMode: 'class', // shadcn/ui uses class-based dark mode

  plugins: [
    forms, // For shadcn/ui form components (Input, Textarea, Select)
    // Optional: Add if using animations in shadcn/ui components
    require('tailwindcss-animate'),
  ],
};