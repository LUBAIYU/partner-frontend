import request from '../plugins/request'

//创建队伍
export const addTeamAPI = (data: any) => {
    return request({
        method: 'POST',
        url: '/team/add',
        data
    })
}

//查询队伍列表
export const listTeamsAPI = (data?: any) => {
    return request({
        method: 'GET',
        url: '/team/list',
        params: data
    })
}

//获取我创建的队伍
export const listMyCreateTeamsAPI = (data?: any) => {
    return request({
        method: 'GET',
        url: '/team/list/my/create',
        params: data
    })
}

//获取我加入的队伍
export const listMyJoinTeamsAPI = (data?: any) => {
    return request({
        method: 'GET',
        url: '/team/list/my/join',
        params: data
    })
}

//加入队伍
export const joinTeamAPI = (data: any) => {
    return request({
        method: 'POST',
        url: '/team/join',
        data
    })
}

//更新队伍
export const updateTeamAPI = (data: any) => {
    return request({
        method: 'PUT',
        url: '/team/update',
        data
    })
}

//根据ID查询队伍
export const getTeamByIdAPI = (id: number) => {
    return request({
        method: 'GET',
        url: '/team/get',
        params: {
            id: id
        }
    })
}

//退出队伍
export const quitTeamAPI = (teamId: number) => {
    return request({
        method: 'POST',
        url: '/team/quit',
        data: {
            teamId: teamId
        }
    })
}

//解散队伍
export const delTeamAPI = (id: number) => {
    return request({
        method: 'DELETE',
        url: '/team/delete',
        data: {
            id: id
        }
    })
}
