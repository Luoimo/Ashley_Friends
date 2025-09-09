<!--
 * @Description: TeamPage.vue
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-29 12:04:50
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-07 14:38:06
-->
<template>
    <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        style="margin-top: 4px"
    >
        <!-- 无限加载 -->
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <!-- 统一放在 config-provider 内，不用 v-if -->
            <van-config-provider :theme-vars="{ cardBackground: 'white' }">
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
                            type="success"
                            @click="onJoinNormalTeam(team)"
                            >加入队伍</van-button
                        >
                        <van-button size="small" type="default"
                            >查看详情</van-button
                        >
                    </template>
                </van-card>
            </van-config-provider>
        </van-list>
    </van-pull-refresh>
    <van-dialog
        v-model:show="showDialog"
        title="请输入密码"
        @confirm="onJoinSecretTeam"
        show-cancel-button
    >
        <van-form>
            <van-field v-model="password" label="密码" type="password" />
        </van-form>
    </van-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { TeamVO, TeamSearchRequest, TeamJoinDTO } from '../models/team'
import { getTeamList, joinTeam } from '../api/team'
import moment from 'moment'
import { showNotify } from 'vant'

const showDialog = ref(false)
const currentTeam = ref<TeamVO | null>(null)
const loading = ref(false) // 是否在加载中
const finished = ref(false) // 是否已加载完毕
const refreshing = ref(false) // 下拉刷新状态
const teamList = ref<TeamVO[]>([])
const password = ref(undefined)
const teamSearchRequest: TeamSearchRequest = {
    pageNum: 1,
    pageSize: 10,
    expireTime: moment(new Date()).format('YYYY-MM-DD'),
}

const statusArr: string[] = ['公开', '私有', '加密']

const onJoinNormalTeam = (team: TeamVO) => {
    if (team.status === 2) {
        currentTeam.value = team // 保存
        showDialog.value = true
    } else {
        toJoinTeam(team)
    }
}

const onJoinSecretTeam = async () => {
    if (!currentTeam.value) return
    await toJoinTeam(currentTeam.value)
    showDialog.value = false
    password.value = undefined // 清空密码
    currentTeam.value = null
}

const toJoinTeam = async (team: TeamVO) => {
    const teamJoinDTO: TeamJoinDTO = {
        teamId: team.id,
        password: password.value,
    }
    await joinTeam(teamJoinDTO).then(() => {
        showNotify({
            type: 'primary',
            message: '加入成功',
        })
    })
}
// 下拉刷新
const onRefresh = async () => {
    finished.value = false
    teamSearchRequest.pageNum = 1
    await onLoad()
}
// 加载数据
const onLoad = async () => {
    loading.value = true
    try {
        const res = await getTeamList(teamSearchRequest)
        const newData = res.data
        console.log(newData)

        if (refreshing.value) {
            teamList.value = []
            refreshing.value = false
        }

        teamList.value.push(...newData)

        // 判断是否加载完成
        if (newData.length < teamSearchRequest.pageSize) {
            finished.value = true
        } else {
            teamSearchRequest.pageNum++
        }
    } finally {
        loading.value = false
    }
}
</script>
<style scoped></style>
