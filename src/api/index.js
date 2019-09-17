//简化axios请求
import axios from './request'
export const requestLogin = (username,password)=>axios.post('/login',{username,password});
//获取分类商品数据
export const reqGetCategories = ()=>axios.get('/category/get');

//添加分类商品数据
export const reqAddCategory = (categoryName)=>axios.post('/category/add',{categoryName});

//更新分类商品数据
export const reqUpdateCategory = (categoryId,categoryName)=>axios.post('/category/update',{categoryId,categoryName});

//删除分类商品数据
export const reqDeleteCategory = (categoryId)=>axios.post('/category/delete',{categoryId});
