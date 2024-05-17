import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import routes from "./config/route.ts";
import 'vant/es/toast/style';

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
