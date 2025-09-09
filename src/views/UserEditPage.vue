<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-30 08:37:00
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-07 11:01:16
-->
<template>
    <van-form @submit="onSubmit">
        <van-cell-group>
            <van-field
                v-model="value"
                :label="label"
                placeholder="请输入信息"
            />
        </van-cell-group>
        <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { updateUserInfo } from '../api/user'
import { useUserStore } from '../store/user'
import type { User } from '../models/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const value = ref((route.query.value as string) || '')
const label = ref((route.query.label as string) || '')
const rawUser = userStore.currentUser as User

const onSubmit = async () => {
    const user = ref<User>({
        ...rawUser,
        tags: JSON.stringify(rawUser.tags),
    })
    mapFields(user.value)
    await updateUserInfo(user.value)
    await userStore.getCurrentUser()
    router.back()
}

const mapFields = (user: User) => {
    switch (label.value) {
        case '用户名':
            user.username = value.value
            break
        case '邮箱':
            user.email = value.value
            break
        case '电话':
            user.phone = value.value
            break
        case '头像':
            user.avatarUrl = value.value
            break
        default:
            console.warn('未知字段', label.value)
            return
    }
}
</script>
