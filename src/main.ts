import { createApp } from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
// fas意为把free-solid-svg-icons中的所有的图标都引入
// import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import App from './App.vue'

library.add(fas)
import './styles/index.css'
console.log(App.render?.toString());

createApp(App)
.mount('#app')
