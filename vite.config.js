import Vue from '@vitejs/plugin-vue'
// vue.config.js
import Icons from 'unplugin-icons/vite'
// 引入loader
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

const config = {
  plugins: [
    Vue(),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
      // 自定义图标加载
      customCollections: {
        // home图标集
        // 给svg文件设置fill="currentColor"属性，使图标的颜色具有适应性
        home: FileSystemIconLoader('src/assets/svg', svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
      },
    }),
    Components({
      dts: true,
      resolvers: [
        IconsResolver({
          alias: {
            park: 'icon-park',
          },
          customCollections: ['home'],
        }),
      ],
    }),
  ],
}
export default config
