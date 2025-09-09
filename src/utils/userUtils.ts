// utils/userUtils.ts
import type { User } from '../models/user' // 假设你的 User 类型在这里

/**
 * 把后端返回的用户列表数据转换成前端需要的格式
 * @param data 后端返回的用户数组
 */
export function transformUser(data: User) {
    return {
        ...data,
        tags: JSON.parse(data.tags as string), // 把 tags 字段从字符串转换成数组
    }
}
