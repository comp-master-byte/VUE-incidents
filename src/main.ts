import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './core/App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
