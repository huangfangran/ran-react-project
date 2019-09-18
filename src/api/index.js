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

//获取商品数据
export const reqGetProducts = (pageNum,pageSize)=>axios.get('/product/list',{params:{pageNum,pageSize}});

//添加商品数据
export const reqAddProduct = ({categoryId,name,price,desc,detail})=>axios.post('/product/add',{categoryId,name,price,desc,detail});

//更新商品数据
export const reqUpdateProduct = ({name,price,desc,detail,productId,categoryId})=>axios.post('/product/update',{name,price,desc,detail,productId,categoryId});

//搜索商品数据
export const reqSearchProducts = ({searchKey,searchValue,pageNum,pageSize})=>axios.get('/product/search',{params: {[searchKey]:searchValue,pageNum,pageSize}});

//获取角色信息
export const reqGetRoles = ()=>axios.get('/role/get');

//添加角色信息
export const reqAddRole = (name)=>axios.post('/role/add',{name});

//更新角色权限
export const reqUpdateRole = (roleId,authName,menus)=>axios.post('/role/update',{roleId,authName,menus});

//获取用户列表
export const reqGetUsers = ()=>axios.get('/user/get');

//添加用户列表
export const reqAddUser = ({username,password,phone,email,roleId})=>axios.post('/user/add',{username,password,phone,email,roleId});