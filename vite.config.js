import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import { meteor } from 'meteor-vite/plugin';

export default defineConfig({
  plugins: [
    meteor({
      clientEntry: 'imports/ui/main.js',
      
    }),
    ViteYaml(),
    vue({
      template: { 
        transformAssetUrls: {
					base: null,
					includeAbsolute: false,
				},
        compilerOptions: {
					isCustomElement: (tag) => tag.startsWith('Bk')
				},
       },
    }),
    quasar({
      autoImportComponentCase: 'pascal',
      sassVariables: 'imports/ui/custom_variables.sass'
    }),
  ],
  optimizeDeps: {
    exclude: ['vue-meteor-tracker'],
    include: ['quasar', 'vue'],
  },
  resolve: {dedupe: ['vue']}
})