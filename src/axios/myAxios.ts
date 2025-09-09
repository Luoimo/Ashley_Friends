/*
 * @Description:
 * @version: v1.0.0
 * @Author: GaoMingze
 * @Date: 2025-08-30 16:48:46
 * @LastEditors: GaoMingze
 * @LastEditTime: 2025-08-31 14:51:18
 */
import axios from 'axios'
import { showNotify } from 'vant'

const myAxios = axios.create({
    baseURL: 'http://localhost:8081/api',
    withCredentials: true, // 允许带cookies
})

// 添加请求拦截器
myAxios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
myAxios.interceptors.response.use(
    function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        const res = response.data
        if (res.code != 0) {
            showNotify({
                type: 'danger',
                message: res.msg,
            })
            return Promise.reject(new Error(res.msg || 'Error'))
        }
        return res
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        showNotify({
            type: 'danger',
            message: '系统错误' + error.message,
        })
        return Promise.reject(error)
    }
)

export default myAxios
