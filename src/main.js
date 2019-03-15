import Vue from 'vue'
import Index from './views/Index.vue'

import './global'
import './plugins'
import './main.scss'

import router from './router'
import i18n from './i18next'
import store from './store'
import logger from './logger'
import * as VueGoogleMaps from 'vue2-google-maps'

/* eslint-disable no-undef */
logger.log(
  `%cCrust CRM, version: ${CRUST_VERSION}, build time: ${CRUST_BUILD_TIME}`,
  'background-color: #1397CB; color: white; padding: 3px 10px; border: 1px solid black; font: Courier',
)

if (window.CrustConfig === undefined) {
  alert('Unexisting or invalid configuration. Make sure there is a public/config.js configuration file.')
} else {
  let key = ''
  try {
    key = window.CrustConfig.webapp.apps.googlemaps.apiKey
  } catch (err) {}

  if (key) {
    Vue.use(VueGoogleMaps, {
      load: {
        key,
        libraries: 'places', // necessary for places input
      },
    })
  }

  new Vue({
    router,
    i18n,
    store,
    render: h => h(Index),
  }).$mount('#app')
}
