let env = require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate : '%s | CodeSnippet',
    meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel : 'stylesheet' , href : 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900|Rubik:400,500,700,900&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  '~assets/styles/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  '@nuxtjs/axios',
  '@nuxtjs/auth'
  ],

  axios : {
    baseUrl : env.parsed.API_URL
  },

  auth : {
    strategies : {
      local : {
        endpoints : {
          login : {
            url : 'auth/login', 
            method : 'post',
            propertyName : 'data.token'
          },
          user : {
            url : 'auth/me', 
            method : 'get',
            propertyName : 'data'
          },
          logout : {
            url : 'auth/logout', 
            method : 'post',
          },
        }

      }
    },
    redirect : {
      login : '/auth/login'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    postcss : {
      plugins : {
        tailwindcss : './tailwind.config.js'
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
