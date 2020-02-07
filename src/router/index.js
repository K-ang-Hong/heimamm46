// 导入vue
import Vue from 'vue';

// 导入vue-router
import VueRouter from 'vue-router';

// 注册use
Vue.use(VueRouter);

// 导入组件 login 
import login from '../views/login/login.vue';

const router = new VueRouter({
    routes:[
        {
            path:"/login",
            component:login
        }
    ]
});

export default router