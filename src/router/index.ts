/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-29 11:52:54
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-10 14:27:26
 */
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/user'

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'LoginLayout',
        component: () => import('../layout/LoginLayout.vue'),
        children: [
            {
                path: '',
                name: 'Login',
                meta: {
                    title: '登录',
                },
                component: () => import('../views/LoginPage.vue'),
            },
        ],
    },
    {
        path: '/',
        name: 'BasicLayout',
        component: () => import('../layout/BasicLayout.vue'),
        children: [
            {
                path: 'home',
                name: 'Home',
                meta: {
                    title: '首页',
                },
                component: () => import('../views/HomePage.vue'),
            },
            {
                path: 'search',
                name: 'Search',
                meta: {
                    title: '搜索',
                },
                component: () => import('../views/SearchPage.vue'),
            },
            {
                path: 'searchResult',
                name: 'SearchResult',
                meta: {
                    title: '搜索结果',
                },
                component: () => import('../views/SearchResultPage.vue'),
            },
            {
                path: 'user',
                name: 'User',
                meta: {
                    title: '个人信息',
                },
                component: () => import('../views/UserPage.vue'),
            },
            {
                path: 'user/edit',
                name: 'UserEdit',
                meta: {
                    title: '编辑团队',
                },
                component: () => import('../views/UserEditPage.vue'),
            },
            {
                path: 'team',
                name: 'Team',
                meta: {
                    title: '团队',
                },
                component: () => import('../views/TeamPage.vue'),
                children: [
                    {
                        path: '',
                        name: 'TeamHome',
                        meta: {
                            title: '现有队伍',
                        },
                        component: () => import('../views/TeamHomePage.vue'),
                    },
                    {
                        path: 'add',
                        name: 'TeamAdd',
                        meta: {
                            title: '创建队伍',
                        },
                        component: () => import('../views/TeamAddPage.vue'),
                    },
                    {
                        path: 'myTeam',
                        name: 'TeamMyTeam',
                        meta: {
                            title: '我的队伍',
                        },
                        component: () => import('../views/TeamMyTeamPage.vue'),
                    },
                    {
                        path: 'modify',
                        name: 'TeamModify',
                        meta: {
                            title: '修改队伍',
                        },
                        component: () => import('../views/TeamModifyPage.vue'),
                    },
                ],
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(), // HTML5 History 模式
    routes,
})

router.beforeEach((to, _from, next) => {
    const userStore = useUserStore()
    if (to.meta.title) {
        document.title = to.meta.title as string
    }
    if (to.name === 'Login') {
        next()
        return
    }
    if (!userStore.isLoggedIn) {
        next({ path: '/' })
    } else {
        next()
    }
})

export default router
