import Vue from 'vue'

import './config-check'
import './console-splash'

import './google-maps'

import './plugins'
import './mixins'
import './components'

import i18n, { options as i18nOptions } from './i18n'
import store from './store'
import router from './router'

export default (options = {}) => {
  options = {
    el: '#app',
    name: 'one',
    template: '<div v-if="loaded"><router-view/></div>',

    data: () => ({ loaded: false }),

    async created () {
      return this.$auth.handle().then(({ accessTokenFn, user }) => {
        this.loaded = true

        const url = new URL(window.location.href)
        let redir = false
        if (url.searchParams.get('code')) {
          url.searchParams.delete('code')
          redir = true
        }

        if (url.pathname === '/auth/callback') {
          url.pathname = ''
          redir = true
        }

        if (redir) {
          window.location.assign(url)
        }
      }).catch((err) => {
        if (err instanceof Error && err.message === 'Unauthenticated') {
          // user not loggsed-in,
          // start with authentication flow
          this.$auth.startAuthenticationFlow()
          return
        }

        throw err
      })
    },

    router,
    store,
    i18n: i18n(options.i18nOptions || i18nOptions),

    // Any additional options we want to merge
    ...options,
  }

  return new Vue(options)
}
