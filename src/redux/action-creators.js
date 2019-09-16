/*
* 此模块用来创建action对象
* */
import {SAVE_USER, REMOVE_USER, SET_TITLE} from './action-types'

//保存用户数据
export const saveUser = user => ({type: SAVE_USER, data: user});
//设置用户数据
export const setTitle = title => ({type: SET_TITLE, data: title});
//移除用户数据
export const removeUser = () => ({type: REMOVE_USER});