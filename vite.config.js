import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './', // Electron dosya yolları için gerekli (göreceli yollar)
    server: {
        port: 5173,
        strictPort: true
    }
})
