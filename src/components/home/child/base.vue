<template>
    <div></div>
</template>

<script>
export default {
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {},
    //数据
    data() {
        return {
            lootBoxImg: require('../../../assets/img/home/bg-loot-box.png').default,
            bannerImg: require("../../../assets/img/home/bg-home-banner.png").default,
            memorialNftImg: {
                big: require("../../../assets/img/home/bg-memorNFT-top.png").default,
                small: require("../../../assets/img/home/bg-memorNFT-small.png").default,
            },
            slideList: [
                {
                    title: "What is Initial Cat?",
                    img: require("../../../assets/img/home/img-introduction-1.png").default,
                    url: ''
                },
                {
                    title: "Application of multi-resource NFT",
                    img: require("../../../assets/img/home/img-introduction-2.png").default,
                    url: ''
                },
                {
                    title: "Application of multi-resource NFT",
                    img: require("../../../assets/img/home/img-introduction-3.png").default,
                    url: ''
                }
            ],
            partnerList: [
                require("../../../assets/img/home/icon-coinMarketCap.png"),
                require("../../../assets/img/home/icon-coinGecko.png"),
                require("../../../assets/img/home/icon-mathwallet.png"),
                require("../../../assets/img/home/icon-metamask.png"),
                require("../../../assets/img/home/icon-tokenPocket.png"),
                require("../../../assets/img/home/icon-imToken.png"),
                require("../../../assets/img/home/icon-dapp.png"),
                require("../../../assets/img/home/icon-dappRadar.png"),
            ],
            communityList: [
                {
                    icon: require("../../../assets/img/home/icon-twitter.png"),
                    title: 'Twitter',
                    url: ''
                },
                {
                    icon: require("../../../assets/img/home/icon-telegram.png"),
                    title: 'Telegram',
                    url: ''
                },
                {
                    icon: require("../../../assets/img/home/icon-discord.png"),
                    title: 'Discord',
                    url: ''
                },
            ],
            cueEcoIdx: 2, // 当前EcoTab索引值 
            ecoTabList: [
                {
                    name: 'Ichiban Kuji',
                    content: require("../../../assets/img/home/bg-ecosystem.png").default
                },
                {
                    name: 'Initial Cat 3D',
                    content: require("../../../assets/img/home/bg-ecosystem.png").default
                },
                {
                    name: 'Ecosystem',
                    content: require("../../../assets/img/home/bg-ecosystem.png").default
                },
                {
                    name: 'Tokenomics',
                    content: require("../../../assets/img/home/bg-ecosystem.png").default
                },
                {
                    name: 'GameFi',
                    content: require("../../../assets/img/home/bg-ecosystem.png").default
                },
                {
                    name: 'Subverse',
                    content: require("../../../assets/img/home/bg-ecosystem.png").default
                },
            ]
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        selectEcoTab(idx) {
            this.cueEcoIdx = idx;
        },
        handleGoIntroductDetail(item) {
            window.open(item.url, '_blank');
        }
    },
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped></style>
