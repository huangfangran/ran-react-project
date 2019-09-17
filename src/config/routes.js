import Home from '../components/home'
import Category from '../container/category'
import Product from '../container/product'
import AddUpdate from '../container/product/add-update'

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
    }
];

export default routes