//简化axios请求
import axios from './request'

export const requestLogin = (username,password)=>axios.post('./login',{username,password});