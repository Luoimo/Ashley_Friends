<!--
 * @Description: 
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-29 16:41:51
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-04 15:00:20
-->
<template>
    <div>
        <!-- 搜索框 -->
        <van-search
            v-model="keyword"
            placeholder="搜索可选标签..."
            @search="onSearch"
            @cancel="onCancel"
        />

        <!-- 已选标签 -->
        <div class="selected-tags">
            <van-tag
                v-for="tag in selectedTags"
                :key="tag.id"
                type="primary"
                plain
                closeable
                @close="removeTag(tag.id)"
            >
                {{ tag.text }}
            </van-tag>
        </div>

        <!-- Treeselect -->
        <van-tree-select
            v-if="filteredTagList.length"
            v-model:active-id="activeId"
            v-model:main-active-index="activeIndex"
            :items="filteredTagList"
        />
        <van-empty v-else description="暂无数据" />
    </div>
    <div style="margin: 16px">
        <van-button
            round
            block
            type="primary"
            native-type="submit"
            @click="onSubmit"
        >
            提交
        </van-button>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { Search, Tag, TreeSelect, Empty, Button, showNotify } from 'vant'
import { Notify } from 'vant'
import router from '../router'
import { getTagListAll } from '../api/tag'

const keyword = ref('')
const activeId = ref([])
const activeIndex = ref(0)
const items = ref([])
let tagList = ref(items)

// watch(keyword, (newVal) => {
//     if (!newVal) {
//         tagList.value = items
//     } else {
//         tagList.value = items.filter((item) =>
//             item.children.some((child) => child.text.includes(newVal))
//         )
//     }
// })
const filteredTagList = computed(() => {
    if (!keyword.value) return items.value
    return items.value.filter((item) =>
        item.children.some((child) => child.text.includes(keyword.value))
    )
})

const selectedTags = computed({
    get() {
        const allChildren = items.value.flatMap((item) => item.children)
        return allChildren.filter((child) => activeId.value.includes(child.id))
    },
    set(newVal) {
        activeId.value = newVal.map((t) => t.id)
    },
})

onMounted(async () => {
    const { data } = await getTagListAll()
    items.value = data
})

// 搜索事件
const onSearch = () => {
    //根据输入值过滤items存入tagList
    console.log(selectedTags.value)
}

// 取消搜索事件
const onCancel = () => {
    //清空输入框内容
    keyword.value = ''
}

const removeTag = (id) => {
    activeId.value = activeId.value.filter((t) => t !== id)
}

const onSubmit = () => {
    if (selectedTags.value.length === 0) {
        showNotify('请选择标签')
    } else {
        router.push({
            path: '/searchResult',
            query: {
                selectedTags: selectedTags.value.flatMap((t) => t.text),
            },
        })
    }
}
</script>

<style>
.selected-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 8px 0;
}
</style>
