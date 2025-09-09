/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-09-07 00:33:24
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-07 22:00:23
 */

import type { UserVO } from './UserVO'

export interface TeamAddDTO {
    name: string
    description?: string
    maxNum: number
    expireTime: String | null
    password?: string
    status: number | null
}

export interface TeamModifyDTO {
    name: string
    description?: string
    maxNum: number
    expireTime: String | null
    password?: string
    status: number | null
}

export interface TeamVO {
    id: number
    name: string
    description?: string
    maxNum: number
    expireTime?: string | Date
    status: number // 0-公开,1-私有,2-加密
    userId: number
    createTime?: string | Date
    updateTime?: string | Date
    creator: UserVO // 队伍创建者信息
}

export interface TeamSearchRequest {
    id?: number
    searchText?: string
    name?: string
    description?: string
    expireTime?: string | Date
    maxNum?: number
    userId?: number
    status?: number // 0: 公开, 1: 不公开, 2: 加密
    pageNum: number
    pageSize: number
}

export interface TeamJoinDTO {
    teamId: number
    password?: string
}

export interface TeamQuitDTO {
    teamId: number
}

export interface TeamDeleteDTO {
    teamId: number
}
