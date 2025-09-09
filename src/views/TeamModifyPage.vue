<template>
    <van-form @submit="onSubmit" label-width="100px">
        <van-cell-group inset style="margin-top: 16px">
            <!-- 队伍名称 -->
            <van-field
                v-model="form.name"
                name="name"
                label="队伍名称"
                placeholder="请输入队伍名称"
                maxlength="10"
                :rules="[{ required: true, message: '请输入队伍名称' }]"
            />

            <!-- 队伍描述 -->
            <van-field
                v-model="form.description"
                name="description"
                label="队伍描述"
                placeholder="请输入队伍描述"
                type="textarea"
                rows="3"
                maxlength="200"
                show-word-limit
            />

            <!-- 队伍人数 -->
            <van-field
                label="队伍人数"
                :rules="[{ required: true, message: '请输入队伍人数' }]"
            >
                <template #input>
                    <van-stepper v-model="form.maxNum" :min="1" :max="5" />
                </template>
            </van-field>

            <!-- 队伍过期时间 -->
            <van-field
                clickable
                name="expireTime"
                label="过期时间"
                placeholder="请选择过期时间"
                v-model="expireTimeText"
                @click="showCalendar = true"
                :rules="[{ required: true, message: '请选择过期时间' }]"
            />
            <van-calendar
                v-model:show="showCalendar"
                @confirm="onConfirmDate"
            ></van-calendar>

            <!-- 队伍状态 -->
            <van-field
                readonly
                clickable
                name="status"
                label="队伍状态"
                placeholder="请选择状态"
                v-model="statusText"
                @click="showStatusPicker = true"
                :rules="[{ required: true, message: '请选择状态' }]"
            />
            <van-popup v-model:show="showStatusPicker" position="bottom">
                <van-picker
                    :columns="statusOptions"
                    @confirm="onConfirmStatus"
                    @cancel="showStatusPicker = false"
                />
            </van-popup>

            <!-- 队伍密码 (仅当状态为加密时显示) -->
            <van-field
                v-if="form.status === 2"
                v-model="form.password"
                name="password"
                label="队伍密码"
                placeholder="请输入6-20位密码"
                type="password"
                maxlength="20"
                :rules="[
                    { required: true, message: '请输入6-20位密码' },
                    {
                        validator: checkPassword,
                        message: '密码必须在6-20位之间',
                    },
                ]"
            />

            <!-- 提交按钮 -->
            <div style="margin: 16px">
                <van-button round block type="primary" native-type="submit">
                    修改队伍
                </van-button>
            </div>
        </van-cell-group>
    </van-form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { showNotify } from 'vant'
import { useRoute } from 'vue-router'
import type { TeamModifyDTO, TeamSearchRequest } from '../models/team'
import { modifyTeam, getTeamList } from '../api/team'
import router from '../router'
import moment from 'moment'

const route = useRoute()
const teamSearchRequest: TeamSearchRequest = {
    id: Number(route.query.teamId),
    pageNum: 1,
    pageSize: 10,
}

const form = ref<TeamModifyDTO>({
    name: '',
    description: undefined,
    maxNum: 4,
    expireTime: null,
    password: undefined,
    status: null,
})

onMounted(async () => {
    await getTeamList(teamSearchRequest).then((res) => {
        if (res.data.length > 0) {
            form.value = res.data[0]
        }
    })
})

const showCalendar = ref(false)
const showStatusPicker = ref(false)

const statusOptions = [
    { text: '公开', value: 0 },
    { text: '私有', value: 1 },
    { text: '加密', value: 2 },
]

const statusText = computed(() => {
    const option = statusOptions.find((opt) => opt.value === form.value.status)
    return option ? option.text : ''
})

const expireTimeText = computed(() => {
    return form.value.expireTime ? form.value.expireTime.slice(0, 10) : ''
})
const checkPassword = (val: String) => {
    return val.length >= 6 && val.length <= 20
}
const onConfirmDate = (date: Date) => {
    form.value.expireTime = moment(date).format('YYYY-MM-DD')
    showCalendar.value = false
}

const onConfirmStatus = (option: any) => {
    form.value.status = option.selectedOptions[0].value
    showStatusPicker.value = false
}

const onSubmit = async () => {
    await modifyTeam(teamSearchRequest.id as number, form.value).then(() => {
        showNotify({
            type: 'primary',
            message: '修改成功',
        })
    })
    router.push('/team/myTeam')
}
</script>

<style scoped></style>
