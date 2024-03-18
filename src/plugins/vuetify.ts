/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { aliases, fa } from "vuetify/iconsets/fa-svg"

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#222E50',
          grey: '#FAFAFB',
          secondary: '#171A1F',
          sub: '#4B7BEC',
          'dark-green': '#2A4849',
          'dark-grey': '#6E7787',
          'light-blue': '#DCE6FB'
        }
      }
    }
  }
})
