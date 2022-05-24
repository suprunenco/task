import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { createI18n } from 'vue-i18n'
import messages from './i18n'

import App from './App.vue'
import router from './router'

const i18n = createI18n({
    locale: 'ru',
    messages
  })

const app = createApp(App)

app.use(createPinia())
app.use(Quasar, {
  plugins: {},
})
app.use(router)
app.use(i18n)

app.mount('#app')
