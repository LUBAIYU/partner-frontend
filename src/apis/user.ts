import request from "../plugins/request";
import qs from 'qs';

//根据标签搜索用户
export const searchUserByTagsAPI = (tags: string[]) => {
    return request({
        url: '/user/search/tags',
        params: {
            tagNameList: tags
        },
        paramsSerializer: function (params) {
            return qs.stringify(params, {indices: false})
        }
    })
}

//修改用户信息
export const updateUserAPI = (data: any) => {
    return request({
        method: 'POST',
        url: '/user/update',
        data
    })
}

//获取当前用户信息
export const getCurrentUserAPI = () => {
    return request({
        url: '/user/current',
    })
}

//用户登录
export const userLoginAPI = (data: any) => {
    return request({
        method: 'POST',
        url: '/user/login',
        data
    })
}

//主页推荐用户信息
export const recommendUserAPI = ({page, pageSize}: any) => {
    return request({
        url: '/user/recommend',
        params: {
            page: page,
            pageSize: pageSize
        }
    })
}

//匹配用户
export const matchUsersAPI = (data: number) => {
    return request({
        method: 'GET',
        url: '/user/match',
        params: {
            num: data
        }
    })
}