<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-29 11:11:26
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-07 13:49:38
-->
<template>
    <div class="basic-layout">
        <van-nav-bar
            :title="title"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
            <template #right>
                <van-icon name="search" @click="onClickRight" />
            </template>
        </van-nav-bar>
        <router-view class="content" />

        <van-tabbar v-model="active">
            <van-tabbar-item name="home" icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item name="team" icon="friends-o">队伍</van-tabbar-item>
            <van-tabbar-item name="user" icon="user-o">个人</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { routeTitleMap } from '../utils/routeTitleMap'

const router = useRouter()
const route = useRoute()
const title = computed(() => {
    const fn = route.meta.title
    return fn
})
const active = computed({
    get: () => route.path.replace('/', ''), // 读的时候就是当前路由
    set: (val) => router.push(val.startsWith('/') ? val : '/' + val),
})

const onClickLeft = () => {
    router.back()
}
const onClickRight = () => {
    router.push('/search')
}
</script>
<style scoped></style>
