import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import PortalVue from 'portal-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap/dist/css/bootstrap.min.css"
import '@/css/custom.scss';
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'
import VueCookies from 'vue-cookies'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App)
app.use(store)
app.use(router)
app.use(PortalVue);
app.use(VueAxios, axios)
app.use(VueCookies, { expires: '1d'})
app.component('VueDatePicker', VueDatePicker);
app.mount('#app')
