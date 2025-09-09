/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-31 14:30:45
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-08-31 21:57:53
 */
// src/stores/user.ts
import { defineStore } from 'pinia'
import axios from '../axios/myAxios'
import type { User } from '../models/user'
import { transformUser } from '../utils/userUtils'

export const useUserStore = defineStore('user', {
    state: () => ({
        currentUser: null as User | null,
    }),

    getters: {
        isLoggedIn: (state) => state.currentUser !== null,
    },

    actions: {
        async getCurrentUser() {
            //获取当前用户信息,设置currentuser
            try {
                const res = await axios.get('/user/current')
                this.currentUser = transformUser(res.data)
            } catch (err) {
                this.currentUser = null
                console.error('获取当前用户失败:', err)
            }
        },
        async logout() {
            //退出登录，清除服务端session
            await axios.post('/user/logout')
            this.currentUser = null
        },
    },
})
