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
    data() {
        return {
            isShowMenu: false
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        goToNav(item) {
            if (item.path) {
                const e = event.target;
                const LEFT = e.offsetLeft + e.clientWidth / 2;
                this.$refs.navLine.style.left = LEFT + "px";
            }
            this.goToPage(item);
        },
        async goToPage(item) {
            this.isShowMenu = false;
            $("body").removeClass("disable");

            // 目前有未开发功能
            if (!item) {
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
        handleShowMenuModal() {
            this.isShowMenu = true;
            $("body").addClass("disable");
        }
    },
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped lang="scss"></style>
