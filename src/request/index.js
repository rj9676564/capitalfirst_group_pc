/**
 * request.js
 * 通过promise对axios做二次封装，针对用户端参数，做灵活配置
 */

import qs from 'qs';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import instance from './interceptors';
import router from '@/router';


/**
 * 核心函数，可通过它处理一切请求数据，并做横向扩展
 * @param {url} 请求地址
 * @param {params} 请求参数
 * @param {options} 请求配置，针对当前本次请求；
 * @param error 本次是否显示错误
 */
function request(url, params, options, method,config) {
  const userInfo = useUserStore()
  const { users } = storeToRefs(userInfo)
  // const router = useRouter()
  // console.log(router)
  return new Promise((resolve, reject) => {
    let instanceOptions = {
      url,
      method,
      config
    }
    if(users.value.token && !config) params.token = users.value.token;
    // // get请求使用params字段
    if (method === 'get') instanceOptions.params = params;
    // // post请求使用data字段
    // if (method === 'post') instanceOptions.data = !config ? qs.stringify(params) : params;
    if (method === 'post') instanceOptions.data = params;
    instance(instanceOptions).then((res) => {
      if (!res) return;
      // 此处作用很大，可以扩展很多功能。
      // 比如对接多个后台，数据结构不一致，可做接口适配器
      // 也可对返回日期/金额/数字等统一做集中处理
      if (res.code === 200) {
        resolve(res);
      } else if (res.code === 302) {
        ElMessage({
          message: 'Login is invalid, please wait for login again!',
          type: 'error',
        })
        if (users.value.token) {
          userInfo.deleteUsers()
          setTimeout(() => router.push({path:'login'}), 1500)
        }
        reject(res)
      } else if(res.code === -1){
        ElMessage({
          message: res.msg || 'serve error',
          type: 'error',
        })
        reject(res)
      }else{
        // 通过配置可关闭错误提示
        if (!options.error) {
          ElMessage({
            message: res.msg,
            type: 'error',
          })
        }
        resolve(res);
      }
    }).catch((error) => {
      reject(error);
      ElMessage({
        message: error,
        type: 'error',
      })
    }).finally(() => {
      // console.log('to do');
    })
  })
}

// 封装GET请求
const get = function (url, params = {}, options = { error: true }) {
  return request(url, params, options, 'get')
}

// 封装POST请求
const post = function (url, params = {}, options = { error: true },config) {
  return request(url, params, options, 'post',config)
}

const obj = {
  get,
  post
}

export default obj;