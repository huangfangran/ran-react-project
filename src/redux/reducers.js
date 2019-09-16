/*
* 此模块用来更新status
* */

import {combineReducers} from 'redux'

import {SAVE_USER, REMOVE_USER, SET_TITLE} from './action-types'
import {getItem, setItem, removeItem} from '../utils/storage'

const initUser = {
    user: getItem('user') || {},
    token: getItem('token') || ''
};

//操作用户数据
function user(prevState = initUser, action) {
    switch (action.type) {
        case SAVE_USER:
            setItem('user', action.data.user);
            setItem('token', action.data.token);
            return action.data;
        case REMOVE_USER:
            removeItem('user');
            removeItem('token');
            return {user: {}, token: ''};
        default:
            return prevState;
    }
}

//操作标题名称
function title(prevState = '', action) {
    switch (action.type) {
        case SET_TITLE:
            return action.data;
        default:
            return prevState
    }
}

export default combineReducers({
    user,
    title
})