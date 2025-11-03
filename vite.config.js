import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({
    emitWarning: true, // 编译时只显示警告
    emitError: false,  // 不作为错误阻止编译
  })],
})
