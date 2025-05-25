import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: 'precisoja-front',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'precisoja-front'),
      '@js': path.resolve(__dirname, 'precisoja-front/js'),
      '@css': path.resolve(__dirname, 'precisoja-front/style.css')
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})
