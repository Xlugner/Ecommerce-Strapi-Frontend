/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60a5fa', // para hover
          DEFAULT: '#3b82f6', // color principal
          dark: '#2563eb', // para active/focus
        },
        secondary: {
          light: '#d1d5db',
          DEFAULT: '#9ca3af',
          dark: '#6b7280',
        },
        accent: {
          light: '#34d399',
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        neutral: {
          50: '#f9fafb',   // fondo de página
          100: '#f3f4f6',  // fondos de secciones/tarjetas
          200: '#e5e7eb',  // bordes
          300: '#d1d5db',
          400: '#9ca3af',  // texto secundario
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',  // texto principal
          800: '#1f2937',  // encabezados
          900: '#111827',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
      },
    },
  },
  plugins: [],
}