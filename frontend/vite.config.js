import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    react(),
  ],
  define: {
    'process.env.VITE_REACT_APP_API_URL': JSON.stringify(process.env.VITE_REACT_APP_API_URL)
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  resolve: {
    alias: {
      moment: 'moment/moment.js', // Điều này có thể thay đổi tùy thuộc vào cách bạn đã cài đặt MomentJS
    },
  },

})
