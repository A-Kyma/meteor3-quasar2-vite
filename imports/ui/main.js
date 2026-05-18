import { Meteor } from 'meteor/meteor'
import { createApp } from 'vue'
import { VueMeteor } from 'vue-meteor-tracker'
import { Accounts } from 'meteor/accounts-base'
import { EJSON } from 'meteor/ejson'

import '/imports/startup/both/index'
import '/imports/startup/client/index'
import * as Bk from 'meteor/akyma:bk'
import BkUI from '@akyma/bk-ui'
import {Class, ObjectField, ListField, ScalarField, ValidationError} from "meteor/akyma:astronomy"

// @ts-ignore
import App from './App.vue'
import { router } from './router'

import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

// Import compiled Quasar CSS to guarantee style utilities are present in Meteor runtime.
import 'quasar/dist/quasar.css'


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
  app.use(BkUI, {
    Bk,
    Meteor,
    Class,
    ObjectField,
    ListField,
    ScalarField,
    ValidationError,
    Accounts,
    EJSON
  })
  app.mount('#app')
})
