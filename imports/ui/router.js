import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import BkUIPlaygroundForm from './BkUIPlaygroundForm.vue'
import BkUIPlaygroundTable from './BkUIPlaygroundTable.vue'
import BkUIPlaygroundComponents from './BkUIPlaygroundComponents.vue'
import BkUITagIndex from './BkUITagIndex.vue'
import BkUITagPage from './BkUITagPage.vue'
import { BkParameterTableElements, BkParameterTables, BkTranslations } from '@akyma/bk-ui'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/bkui/form',
      name: 'bkui-form',
      component: BkUIPlaygroundForm,
      meta: { title: 'bkui/form' },
    },
    {
      path: '/bkui/table',
      name: 'bkui-table',
      component: BkUIPlaygroundTable,
      meta: { title: 'bkui/table' },
    },
    {
      path: '/bkui/components',
      name: 'bkui-components',
      component: BkUIPlaygroundComponents,
      meta: { title: 'bkui/components' },
    },
    {
      path: '/bkui/tags',
      name: 'bkui-tags',
      component: BkUITagIndex,
      meta: { title: 'bkui/tags' },
    },
    {
      path: '/bkui/tags/:tag',
      name: 'bkui-tag-page',
      component: BkUITagPage,
      meta: { title: 'bkui/tag' },
    },
    {
      path: '/bkui/parameter-tables',
      name: 'bkui-parameter-tables',
      component: BkParameterTables,
      meta: { title: 'bkui/parameter-tables' },
    },
    {
      path: '/bkui/parameter-elements/:name/:id',
      name: 'bkui-parameter-elements',
      component: BkParameterTableElements,
      meta: { title: 'bkui/parameter-elements' },
    },
    {
      path: '/bkui/translations',
      name: 'bkui-translations',
      component: BkTranslations,
      meta: { title: 'bkui/translations' },
    },
  ],
})
