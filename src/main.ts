/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-29 10:55:38
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-08-31 14:30:07
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router/index'

createApp(App).use(Vant).use(router).use(createPinia()).mount('#app')
