import Vue from 'vue'
import router from 'vue-router'

const Goods = resolve => require(['@/components/goods/goods'], resolve)
const Home = resolve => require(['@/components/home/home'], resolve)
const Ratings = resolve => require(['@/components/ratings/rating'], resolve)
const Seller = resolve => require(['@/components/seller/seller'], resolve)
Vue.use(router)
export default new router({
    routes:[
        {path: '/', redirect: '/home'},
        {
            path: '/home', 
            component: Home,
            redirect: '/goods',
            children: [
                {
                    path: '/goods',
                    component: Goods
                },
                {
                    path: '/ratings',
                    component: Ratings
                },
                {
                    path: '/seller',
                    component: Seller
                }
        ]
        },
    ],
    linkActiveClass: 'active',
})