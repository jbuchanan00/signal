import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return({
    define: {
      'process.env.REACT_APP_BACKEND_URL': JSON.stringify(env.REACT_APP_BACKEND_URL)
    },
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    watch: {
      usePolling: true
    },
    port: 5176,
    strictPort: true,
  }
})})
