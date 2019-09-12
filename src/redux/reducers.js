/*
* 此模块用来更新status
* */

import {combineReducers} from 'redux'

import {SAVE_USER} from './action-types'
import {getItem, setItem} from '../utils/storage'

const initUser = {
    data: getItem('user') || {},
    token: getItem('token') || ''
};

function user(prevState = initUser, action) {
    switch (action.type) {
        case SAVE_USER:
            setItem('user', action.data.user);
            setItem('token', action.data.token);
            return action.data;
        default:
            return prevState;
    }
}

export default combineReducers({
    user
})