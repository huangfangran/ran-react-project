import Home from '../components/home'
import Category from '../container/category'
import Product from '../container/product'
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
    }
];

export default routes