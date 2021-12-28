import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home';
import MyNft from '@/components/myNft';
import Box from '@/components/box';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/myNft',
            name: 'MyNFTs',
            component: MyNft
        },
        {
            path: '/box',
            name: 'Box',
            component: Box
        },
    ]
})
