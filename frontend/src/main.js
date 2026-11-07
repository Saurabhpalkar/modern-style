import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'
import reveal from './directives/reveal'

createApp(App).directive('reveal', reveal).use(router).mount('#app')
