export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'videos-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  vue: {
    config: {
      devtools: process.env.APP_ENV === 'development',
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui', '@/plugins/vimeo-player'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Loading configuration: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading
  loading: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  router: {
    middleware: ['auth'],
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
    },
    strategies: {
      local: {
        cookie: false,
        token: {
          property: 'access_token',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
          },
          logout: {
            url: '/api/auth/logout',
            method: 'post',
          },
          user: {
            url: '/api/auth/me',
            method: 'post',
          },
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
    debug: process.env.APP_ENV === 'development',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    vendor: ['vue-vimeo-player'],
  },
}
