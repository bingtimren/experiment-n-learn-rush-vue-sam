import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['@bingsjs/greeting']
  },  
  resolve: {
    alias: {
      '@bingsjs/greeting': path.dirname(require.resolve('@bingsjs/greeting'))
    }
  }
})
