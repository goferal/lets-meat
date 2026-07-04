import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base '/' works for the custom domain lets-meat.com.
// If previewing at goferal.github.io/lets-meat instead, change base to '/lets-meat/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
