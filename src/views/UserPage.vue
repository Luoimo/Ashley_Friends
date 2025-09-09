<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-29 22:44:15
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-07 13:40:57
-->
<template>
    <van-cell-group>
        <van-cell title="头像">
            <van-image :src="user.avatarUrl" fit="contain" />
        </van-cell>
        <van-cell
            title="用户名"
            :value="user.username"
            @click="editInfo('用户名', user.username)"
            is-link
        />
        <van-cell
            title="账号"
            :value="user.userAccount"
            @click="editInfo('账号', user.userAccount)"
            is-link
        />
        <van-cell
            title="性别"
            :value="user.gender"
            @click="editInfoGender('性别', user.gender ? '女' : '男')"
            is-link
        />
        <van-cell
            title="电话"
            :value="user.phone"
            @click="editInfo('电话', user.phone)"
            is-link
        />
        <van-cell
            title="邮箱"
            :value="user.email"
            @click="editInfo('邮箱', user.email)"
            is-link
        />
        <van-cell title="标签">
            <div class="tags">
                <van-tag
                    type="danger"
                    v-for="(tag, index) in user.tags"
                    :key="index"
                    >{{ tag }}</van-tag
                >
            </div>
        </van-cell>
        <van-cell title="注册时间" :value="user.createTime" />
    </van-cell-group>
    <div style="margin: 16px">
        <van-button
            round
            block
            type="danger"
            native-type="button"
            @click="logout"
        >
            退出登录
        </van-button>
    </div>

    <van-popup v-model:show="show" position="bottom">
        <van-picker
            :title="activeInfo"
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
        />
    </van-popup>
</template>
<script setup lang="ts">
import type { User } from '../models/user'
import { onMounted, ref } from 'vue'
import router from '../router'
import { useUserStore } from '../store/user'

const show = ref(false)
const activeInfo = ref('')
const userStore = useUserStore()
const columns = [{ text: '男' }, { text: '女' }]
const user = ref<User>({} as User)

onMounted(() => {
    user.value = userStore.currentUser as User
})
const onConfirm = (value: string) => {
    console.log(value)
    show.value = false
}
const onCancel = () => {
    show.value = false
}

const editInfoGender = (title: string, value: string) => {
    console.log(title, value)
    activeInfo.value = title
    show.value = true
}
const editInfo = (label: string, value: string) => {
    router.push({
        path: '/user/edit',
        query: {
            label: label,
            value: value,
        },
    })
}

const logout = async () => {
    await userStore.logout()
    router.push('/login')
}
</script>
<style scoped>
.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 8px 0;
    justify-content: right;
}
</style>
