<template>
    <div></div>
</template>

<script>
import UTILS from '@/config/util';
import mailApi from '@/config/mailApi';

export default {
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        curEcoItem() {
            return this.ecoTabList[this.cueEcoIdx];
        }
    },
    //数据
    data() {
        return {
            userEmail: '',
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
                require("../img/icon-partner-1.png"),
                require("../img/icon-partner-2.png"),
                require("../img/icon-partner-3.png"),
                require("../img/icon-partner-4.png"),
                require("../img/icon-partner-5.png"),
                require("../img/icon-partner-6.png"),
                require("../img/icon-partner-7.png"),
                require("../img/icon-partner-8.png"),
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
                {
                    icon: require("../img/icon-medium.png"),
                    title: 'Medium',
                    url: ''
                },
            ],
            cueEcoIdx: 0, // 当前EcoTab索引值 
            ecoTabList: [
                {
                    name: 'Rare NFT',
                    type: 1,
                    content: require("../video/video-rareNft.mp4").default,
                    des: 'You can get rare NFT in many ways. It represents the release of a new theme image of Initial World. Whenever a new theme image is added to Initial World, a new treasure NFT will be issued.'
                },
                {
                    name: 'Initial Cat 3D',
                    type: 2,
                    content: require("../img/img-eco-initialCat.png"),
                    des: 'Cat is the first theme image of Initial World. When you enter Initial World, you will get an Initial Cat 3D for free. You can use this Initial Cat to enter any Metaverse connected to Initial World and get Loot to equip it.'
                },
                {
                    name: 'Ecosystem',
                    type: 3,
                    content: require("../img/img-eco-system.png"),
                    des: ''
                },
                {
                    name: 'Tokenomics',
                    type: 3,
                    content: require("../img/img-eco-token.png"),
                    des: ''
                },
                {
                    name: 'SubMetaverse',
                    type: 2,
                    content: require("../img/img-eco-metaverse.png").default,
                    des: 'SubMetaverse is made by Initial World Team and its partners based on the InitialStudio being developed. Users can use Initial Cat 3D to travel among them. When InitialStudio is fully developed, you can use InitialStudio to easily create their own SubMetaverse and share it with other users. '
                },
            ],
            menuList: [
                'Home',
                'Maketplace',
                'Store',
                'Farm',
                'Box',
                'FAQ',
            ]
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        selectEcoTab(idx) {
            this.cueEcoIdx = idx;
        },
        handleGoIntroductDetail(item) {
            if (!item.url) {
                return;
            }
            window.open(item.url, '_blank');
        },
        handleSubEmail(email) {
            if (!email) {
                this.$toast({
                    message: 'Please input your email',
                    className: 'commonToast-1'
                });
                return;
            }

            if (!UTILS.checkIsEmail(email)) {
                this.$toast({
                    message: 'Please enter your vaild email',
                    className: 'commonToast-1'
                });
                return;
            }

            this.subscribeEmail(email);
        },
        subscribeEmail(email) {
            let config = {
                email
            };
            let url = mailApi.subEmail;

            this.$http
                .post(url, config, "json")
                .then(res => {
                    console.log('email:', res);
                    const { code } = res;
                    if (code === '0000') {
                        this.$toast({
                            message: 'Subscribe Success!',
                            className: 'commonToast-1'
                        });
                    }
                })
                .catch(err => {
                    console.log("err:", err);
                    this.$toast({
                        message: 'Something error, please try again',
                        className: 'commonToast-1'
                    });
                    return false;
                });
        }
    },
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped></style>
