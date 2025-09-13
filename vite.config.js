import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path,{ resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        })
      ],
      dts: './auto-imports.d.ts'
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep'], //@iconify-json/ep 是 Element Plus 的图标库，所以 IconsResolver 配置了 enabledCollections: ['ep']
        })
      ],
      dts: './components.d.ts'
    }),
    Icons({
      autoInstall: true,
    })
  ],
  devServer:{
    hot:true
  },
  resolve: {
    //设置别名
    alias: {
      '@': resolve(__dirname, './src'),
      '~/':`${path.resolve(__dirname, 'src')}/`
    },
  },
  server: {
    hmr:true,
    // 设置 https 代理
    proxy: {
      '/v1': {
        target: 'https://ind.thecapitalfirst.com', // 后端 api 地址
        // target: 'http://101.32.190.110',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, ''),
      },
    },
  },
  css:{
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/assets/scss/globalVar.scss" as *;@use "~/assets/scss/globalMixin.scss" as *;`
      }
    }
  }
})