<template>
    <div></div>
</template>

<script>
import common from "@/common/common";

export default {
    mixins: [common],
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {},
    //数据
    data(){
      return {
          navList: [
              { name: 'Introduction', img: require('../img/icon-introduction.png'), path: '/introduction' },
              { name: 'My NFTs', img: require('../img/icon-myNft.png'), path: '/myNft/' },
              { name: 'Event', img: require('../img/icon-event.png'), path: '/event' },
              { name: 'Document', img: require('../img/icon-document.png'), path: '' },
              { name: 'Email', img: require('../img/icon-email.png'), path: '/email' },
              { name: 'Free Mint', img: require('../img/icon-freeMint.png'), path: '/freeMint' },
              { name: 'Mystery Box', img: require('../img/icon-mysteryBox.png'), path: '/mysteryBox' },
              { name: 'NFT Market', img: require('../img/icon-market.png'), path: '' },
              { name: 'SpeedBoat Box', img: require('../img/icon-speedboatBox.png'), path: '/speedboatBox' },
          ]
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        async goToNav(item) {
            // 目前有未开发功能
            if (!item.path) {
                return false;
            }

            // 导航栏点击当前路由无效
            if (!item.path || this.$route.name.includes(item?.name)) {
                return false;
            }

            const arr = ["/myNft/"];
            // 跳转 My Nfts时，如果未连接浏览器钱包，则自动初始化
            if (!this.curRootWallet) {
                await this.initWallet();
            }
            // 手动点击导航跳转 My Nfts, 钱包参数默认当前连接钱包
            const PATH = arr.includes(item.path)
                ? item.path + this.curRootWallet.address
                : item.path;
            this.$router.push({
                path: PATH
            });
        },
    },
    //请求数据
    created() {},
    mounted() {},
}
</script>

<style scoped lang='scss'>

</style>
