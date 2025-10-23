import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // ✅ 关键配置：部署到 GitHub Pages 时指定路径前缀
  // ⚠️ 把 <repo-name> 换成你的 GitHub 仓库名（区分大小写）
  base: process.env.NODE_ENV === 'production' ? '/<fit5032>/' : '/',
})