import { Meteor } from 'meteor/meteor'
import { createApp } from 'vue'
import { VueMeteor } from 'vue-meteor-tracker'

import '/imports/startup/both/index'
import '/imports/startup/client/index'
import {Bk, I18n, Role, Class} from 'meteor/akyma:bk'
import BkUI from '@akyma/bk-ui'

// @ts-ignore
import App from './App.vue'
import { router } from './router'

import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

// Import Quasar css
import 'quasar/src/css/index.sass'


Meteor.startup(async () => {
  const app = createApp(App)

  app.use(router)
  app.use(VueMeteor)
  
  app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here

    /*
    config: {
      brand: {
        // primary: '#e46262',
        // ... or all other brand colors
      },
      notify: {...}, // default set of options for Notify Quasar plugin
      loading: {...}, // default set of options for Loading Quasar plugin
      loadingBar: { ... }, // settings for LoadingBar Quasar plugin
      // ..and many more (check Installation card on each Quasar component/directive/plugin)
    }
    */
  })
  app.use(BkUI, {Bk, Meteor, isClient: () => Meteor.isClient, I18n, Role, Class})
  app.mount('#app')
})
