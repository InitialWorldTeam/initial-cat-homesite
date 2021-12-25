import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home';
import MyCat from '@/components/myCat';
import Box from '@/components/box';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/myNft',
            name: 'MyNFTs',
            component: MyCat
        },
        {
            path: '/box',
            name: 'Box',
            component: Box
        },
    ]
})
