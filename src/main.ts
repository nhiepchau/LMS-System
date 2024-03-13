/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import router from './utils/router'
import auth from './utils/auth'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import http from './utils/http'

const app = createApp(App)

registerPlugins(app)

app
    .use(router)
    .provide('auth', auth)
    .use(http)
    .mount('#app')
