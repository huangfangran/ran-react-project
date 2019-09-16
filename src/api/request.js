//使用拦截器发送axios请求
import axios from 'axios'
import {message} from 'antd'
import store from '../redux/store'

//创建axios实例
const instance = axios.create({
    baseURL:'http://localhost:3000/api',
    timeout:10000
});

// 设置请求拦截,一般只写一个参数（函数）,为了在请求发出去之前添加上token
instance.interceptors.request.use(
    (config)=>{
        //token从状态中获取
        const {token} = store.getState().user;
        //判断一下，是否需要加上token
        if (token){
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }
);

// 设置响应拦截，一般写两个参数（都是函数）
instance.interceptors.response.use(
    (res)=>{
        //请求成功并返回成功的响应体
        const result = res.data;
        if (result.status === 0){
            //成功的返回
            return result.data
        } else {
            //失败的返回
            message.error(result.msg);
            return Promise.reject(result.msg);
        }
    },
    (err)=>{
        //请求失败
        console.log(err);
        message.error('未知错误，请联系管理员');
        return Promise.reject('未知错误，请联系管理员');
    }
);

// 暴露
export default instance