import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home';
import Box from '@/components/box';
import Faq from '@/components/faq';
import Gltf from '@/components/gltf';
import Collectibles from '@/v2/components/collectibles';
import Introduction from '@/v2/components/introduction';
import MyNft from '@/v2/components/myNft';
import ConnectWallet from '@/v2/components/connectWallet';
import Event from '@/v2/components/event';
import Email from '@/v2/components/email';
import FreeMint from '@/v2/components/freeMint';
import MysteryBox from '@/v2/components/mysteryBox';
import SpeedBox from '@/v2/components/speedBox';
import UseKey from '@/v2/components/useKey';

Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/box',
            name: 'Box',
            component: Box
        },
        {
            path: '/FAQ',
            name: 'Faq',
            component: Faq
        },
        {
            path: '/gltf',
            name: 'Gltf',
            component: Gltf
        },
        {
            path: '/collectibles/:id',
            name: 'Collectibles',
            component: Collectibles
        },
        {
            path: '/introduction',
            name: 'Introduction',
            component: Introduction
        },
        {
            path: '/myNft/:id',
            name: 'My NFTs',
            component: MyNft
        },
        {
            path: '/connnectWallet',
            name: 'Connect Wallet',
            component: ConnectWallet
        },
        {
            path: '/event',
            name: 'Event',
            component: Event
        },
        {
            path: '/email',
            name: 'Email subscription',
            component: Email
        },
        {
            path: '/freeMint',
            name: 'Free Mint',
            component: FreeMint
        },
        {
            path: '/mysterybox',
            name: 'Mystery Box',
            component: MysteryBox
        },
        {
            path: '/speedboatBox',
            name: 'SpeedBoat Box',
            component: SpeedBox
        },
        {
            path: '/usekey',
            name: 'USE KEY',
            component: UseKey
        },

    ]
})

router.afterEach((to, from) => {
    const dom = document.querySelector('.box-common-mint');
    dom && dom.scrollIntoView(true);
})

export default router;
