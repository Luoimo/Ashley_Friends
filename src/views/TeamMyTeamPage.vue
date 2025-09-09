<!--
 * @Description: TeamPage.vue
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-29 12:04:50
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-07 22:06:07
-->
<template>
    <!-- 统一放在 config-provider 内，不用 v-if -->
    <van-config-provider :theme-vars="{ cardBackground: 'white' }">
        <template v-if="teamList.length > 0">
            <van-card
                v-for="team in teamList"
                :key="team.id"
                :title="team.name"
                :thumb="team.creator?.avatarUrl"
                :desc="
                    team.description
                        ? team.description.slice(0, 20) + '...'
                        : ''
                "
                style="box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)"
            >
                <template #tags>
                    <van-tag plain type="primary"
                        >最大人数: {{ team.maxNum }}</van-tag
                    >
                    <van-tag plain type="success">
                        到期时间:
                        {{ team.expireTime?.toLocaleString().slice(0, 10) }}
                    </van-tag>
                    <van-tag plain type="warning">
                        {{ statusArr[team.status] }}
                    </van-tag>
                </template>
                <template #footer>
                    <van-button
                        size="small"
                        type="danger"
                        @click="toQuitTeam(team)"
                        >退出队伍</van-button
                    >
                    <van-button
                        v-if="team.creator.id === currentUser.id"
                        size="small"
                        type="danger"
                        @click="toDeleteTeam(team)"
                        >解散队伍</van-button
                    >
                    <van-button
                        v-if="team.creator.id === currentUser.id"
                        size="small"
                        type="primary"
                        @click="toModifyTeam(team)"
                        >修改队伍</van-button
                    >
                    <van-button size="small" type="default"
                        >查看详情</van-button
                    >
                </template>
            </van-card>
        </template>
        <van-empty v-else>暂未加入队伍</van-empty>
    </van-config-provider>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { TeamVO, TeamQuitDTO, TeamDeleteDTO } from '../models/team'
import type { User } from '../models/user'
import { getMyTeamList, quitTeam, deleteTeam } from '../api/team'
import { showNotify } from 'vant'
import { useUserStore } from '../store/user'
import router from '../router'

const teamList = ref<TeamVO[]>([])
const currentUser = useUserStore().currentUser as User
const statusArr: string[] = ['公开', '私有', '加密']
onMounted(async () => {
    await getMyTeamList().then((res) => {
        teamList.value = res.data
    })
})
const toQuitTeam = async (team: TeamVO) => {
    const teamQuitDTO: TeamQuitDTO = {
        teamId: team.id,
    }
    await quitTeam(teamQuitDTO).then(() => {
        showNotify({
            type: 'primary',
            message: '退出成功',
        })
    })
    await getMyTeamList().then((res) => {
        teamList.value = res.data
    })
}
const toDeleteTeam = async (team: TeamVO) => {
    const teamDeleteDTO: TeamDeleteDTO = {
        teamId: team.id,
    }
    await deleteTeam(teamDeleteDTO).then(() => {
        showNotify({
            type: 'primary',
            message: '解散成功',
        })
    })
    await getMyTeamList().then((res) => {
        teamList.value = res.data
    })
}
const toModifyTeam = (team: TeamVO) => {
    router.push({
        path: '/team/modify',
        query: {
            teamId: team.id,
        },
    })
}
</script>
