/*
* 此模块用来创建action对象
* */
import {SAVE_USER} from './action-types'

export const saveUser = user=>({type:SAVE_USER,data:user});