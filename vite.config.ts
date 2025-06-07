import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SimVestor/',  // for GitHub Pages deployment
  optimizeDeps: {
    include: ['chart.js', 'react-chartjs-2']
  }
})
