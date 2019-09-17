/*
* 此模块用来创建action对象
* */
import {
    SAVE_USER,
    REMOVE_USER,
    SET_TITLE,
    GET_CATEGORIES_SUCCESS,
    ADD_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS
} from './action-types'
import {reqGetCategories, reqAddCategory, reqUpdateCategory, reqDeleteCategory} from '../api'

//保存用户数据
export const saveUser = user => ({type: SAVE_USER, data: user});
//设置用户数据
export const setTitle = title => ({type: SET_TITLE, data: title});
//移除用户数据
export const removeUser = () => ({type: REMOVE_USER});

//获取分类管理数据
const getCategoriesSuccess = (categories) => ({type: GET_CATEGORIES_SUCCESS, data: categories});

//发送axios请求来获取分类管理数据
export const getCategories = () => {
    return async (dispatch) => {
        const result = await reqGetCategories();
        dispatch(getCategoriesSuccess(result))
    }
};

//添加分类管理数据
const addCategorySuccess = (category) => ({type: ADD_CATEGORY_SUCCESS, data: category});

//发送axios请求来添加分类管理数据
export const addCategory = (categoryName) => {
    return async (dispatch) => {
        const result = await reqAddCategory(categoryName);
        dispatch(addCategorySuccess(result))
    }
};

//更新分类管理数据
const updateCategorySuccess = (category) => ({type: UPDATE_CATEGORY_SUCCESS, data: category});

//发送axios请求来更新分类管理数据
export const updateCategory = (categoryId, categoryName) => {
    return async (dispatch) => {
        const result = await reqUpdateCategory(categoryId, categoryName);
        dispatch(updateCategorySuccess(result))
    }
};

//删除分类管理数据
const deleteCategorySuccess = (category)=>({type:DELETE_CATEGORY_SUCCESS,data:category});

//发送axios请求来删除分类管理数据
export const deleteCategory = (categoryId)=>{
    return async (dispatch)=>{
        const result = await reqDeleteCategory(categoryId);
        // console.log(result);
        dispatch(deleteCategorySuccess(result))
    }
};
