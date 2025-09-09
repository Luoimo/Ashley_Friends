<!--
 * @Description: TeamPage.vue
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-29 12:04:50
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-07 12:45:12
-->
<template>
    <van-sticky>
        <div class="sticky-bar">
            <van-button plain type="primary" icon="flag-o" @click="toTeamHome"
                >现有队伍</van-button
            >
            <van-button plain type="primary" icon="plus" @click="toAddTeam"
                >新建队伍</van-button
            >
            <van-button plain type="primary" icon="contact" @click="toMyTeam"
                >我的队伍</van-button
            >
        </div>
    </van-sticky>
    <router-view></router-view>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const toMyTeam = () => {
    router.push('/team/myTeam')
}
const toTeamHome = () => {
    router.push('/team')
}
const toAddTeam = () => {
    router.push('/team/add')
}
</script>
<style scoped>
.sticky-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    .van-button {
        flex: 1;
        border-radius: 0;
        border: 1px solid #eee;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    }
}
</style>
