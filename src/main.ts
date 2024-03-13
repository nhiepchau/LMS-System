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
import { createPinia } from 'pinia'

const app = createApp(App);
const pinia = createPinia();

registerPlugins(app)

app
    .use(router)
    .provide('auth', auth)
    .use(pinia)
    .mount('#app')
