/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-09-07 00:32:24
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-09-07 22:26:16
 */
import myAxios from '../axios/myAxios'
import type {
    TeamAddDTO,
    TeamSearchRequest,
    TeamJoinDTO,
    TeamQuitDTO,
    TeamDeleteDTO,
    TeamModifyDTO,
} from '../models/team'
export const addTeam = (teamAddDTO: TeamAddDTO) => {
    return myAxios.post('/team/add', teamAddDTO, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
export const getTeamList = (teamSearchRequest: TeamSearchRequest) => {
    return myAxios.post('/team/list', teamSearchRequest, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
export const joinTeam = (teamJoinDTO: TeamJoinDTO) => {
    return myAxios.post('/team/join', teamJoinDTO, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
export const getMyTeamList = () => {
    return myAxios.post('/team/myteam')
}
export const quitTeam = (teamQuitDTO: TeamQuitDTO) => {
    return myAxios.post('/team/quit', teamQuitDTO, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
export const deleteTeam = (teamDeleteDTO: TeamDeleteDTO) => {
    return myAxios.post('/team/delete', teamDeleteDTO, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
export const modifyTeam = (id: number, teamModifyDTO: TeamModifyDTO) => {
    return myAxios.post(`/team/update/${id}`, teamModifyDTO, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
