<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-31 14:04:23
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-08-31 15:26:44
-->
<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="form.userAccount"
                name="userAccount"
                label="账户"
                placeholder="账户"
                :rules="[{ required: true, message: '请填写账户' }]"
            />
            <van-field
                v-model="form.userPassword"
                type="password"
                name="userPassword"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
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
import { useRouter } from 'vue-router'
import { loginUser } from '../api/user'
import { useUserStore } from '../store/user'
import type { UserLoginDTO } from '../models/user'

const router = useRouter()
const userStore = useUserStore()
const form = ref<UserLoginDTO>({
    userAccount: '',
    userPassword: '',
})
const onSubmit = async (formValue: UserLoginDTO) => {
    console.log(formValue)
    await loginUser(formValue)
    await userStore.getCurrentUser()
    router.replace('/home')
}
</script>
