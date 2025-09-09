/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-30 16:55:12
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-04 14:57:24
 */
import myAxios from '../axios/myAxios'
import type { UserLoginDTO, User } from '../models/user'

export const getUserListByTags = async (
    tags: string[],
    pageNum: number,
    pageSize: number
) => {
    return myAxios.post(
        '/user/searchByTags',
        { tags, pageNum, pageSize },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
}

export const getCurrentUser = async () => {
    return myAxios.get('/user/current')
}

export const loginUser = async (user: UserLoginDTO) => {
    return myAxios.post('/user/login', user, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const updateUserInfo = async (user: User) => {
    return myAxios.post('/user/update', user, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const getRecommendUserList = async (
    pageNum: number,
    pageSize: number
) => {
    return myAxios.get('/user/recommend', {
        params: {
            pageNum,
            pageSize,
        },
    })
}
