/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-29 22:37:47
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-07 11:00:51
 */
/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-29 22:37:47
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-08-31 14:22:42
 */
export type User = {
    id: number
    username: string
    userAccount: string
    avatarUrl?: string
    gender: number
    phone: string
    email: string
    userStatus: number
    userRole: number
    planetCode: string
    tags: string[] | string
    createTime: string
}

export interface UserVO {
    id: number
    username: string
    userAccount: string
    avatarUrl?: string
    gender?: number
    phone?: string
    email?: string
    userStatus: number // 0 - 正常
    createTime?: string | Date
    updateTime?: string | Date
    userRole: number // 0 - 普通用户, 1 - 管理员
    planetCode?: string
    tags?: string[] | string // 这里后端是 String，如果要用数组可以在前端自己 JSON.parse
}

export interface UserLoginDTO {
    userAccount: string
    userPassword: string
}
