import {createRouter, createWebHashHistory} from "vue-router";

export const routes = [
    {
        path:'/',
        redirect:'/show-list',
        component: ()=> import('@/views/Home/ShowList/index')
    },
    {
        path:'/show-list',
        component: ()=> import('@/views/Home/ShowList/index')
    },
    /* 图表配置 */
    {  // 自定义的不规则图表
        path:'/custom/custom-bar',
        component:()=>import('@/components/custom/custom-bar.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
