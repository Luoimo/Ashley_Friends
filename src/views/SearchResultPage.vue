<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-30 15:53:32
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-04 15:02:48
-->
<template>
    <div>
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <!-- 无限加载 -->
            <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <van-config-provider
                    v-if="userList.length > 0"
                    :theme-vars="{ cardBackground: 'white' }"
                >
                    <van-card
                        v-for="user in userList"
                        :key="user.id"
                        :title="user.username"
                        :thumb="user.avatarUrl"
                    >
                        <template #tags>
                            <van-tag
                                v-for="(tag, index) in user.tags"
                                :key="tag + index"
                                plain
                                type="primary"
                            >
                                {{ tag }}
                            </van-tag>
                        </template>
                    </van-card>
                </van-config-provider>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { User } from '../models/user'
import { getUserListByTags } from '../api/user'
import { transformUser } from '../utils/userUtils'

const route = useRoute()
const userList = ref<User[]>([])
const selectedTags = ref<string[]>(route.query.selectedTags as string[])

const loading = ref(false) // 是否在加载中
const finished = ref(false) // 是否已加载完毕
const refreshing = ref(false) // 下拉刷新状态

let page = 1
const pageSize = 10

// 加载数据
const onLoad = async () => {
    loading.value = true
    try {
        const res = await getUserListByTags(selectedTags.value, page, pageSize)
        const newData = res.data.map(transformUser)

        if (refreshing.value) {
            userList.value = []
            refreshing.value = false
        }

        userList.value.push(...newData)

        // 判断是否加载完成
        if (newData.length < pageSize) {
            finished.value = true
        } else {
            page++
        }
    } finally {
        loading.value = false
    }
}

// 下拉刷新
const onRefresh = async () => {
    finished.value = false
    page = 1
    await onLoad()
}
</script>
<style scoped></style>
