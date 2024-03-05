/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
  library.add(fas) // Include needed solid icons
  library.add(far) // Include needed regular icons

  app.use(vuetify)
}
