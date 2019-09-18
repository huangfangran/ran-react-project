import Home from '../components/home'
import Category from '../container/category'
import Product from '../container/product'
import AddUpdate from '../container/product/add-update'
import ProductDesc from '../container/product/product-desc'
import Role from '../container/role'
import User from '../container/user'

const routes = [
    {
        path:'/',
        exact:true,
        component:Home
    },
    {
        path:'/category',
        exact:true,
        component:Category
    },
    {
        path:'/product',
        exact:true,
        component:Product
    },
    {
        path:'/product/add',
        exact:true,
        component:AddUpdate
    },
    {
        path:'/product/desc',
        exact:true,
        component:ProductDesc
    },
    {
        path:'/role',
        exact:true,
        component:Role
    },
    {
        path:'/user',
        exact:true,
        component:User
    }
];

export default routes