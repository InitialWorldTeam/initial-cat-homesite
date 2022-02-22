<template>
    <div></div>
</template>

<script>
import common from '@/common/common';

export default {
    mixins: [common],
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        isShowSellModal() {
            return Boolean(this.curSellCat);
        },
        address() {
            return this.$route.params?.id;
        }
    },
    //数据
    data() {
        return {
            sellPrice: 0, // 出售价格
            curSellCat: null // 当前出售Cat
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        onCopy: function(e) {
            this.$toast(`已复制：${e.text}`);
        },
        // 点击事件-选择出售Cat
        sellCat(item) {
            $("body").addClass('disable');
            this.curSellCat = item;
        },
        // 取消出售
        clearCellCat() {
            this.curSellCat = null;
            $("body").removeClass('disable');
        },
        goToDetail(item) {
            const PATH = '/collectibles/' + item.id;
            this.$router.push({
                path: PATH
            });
        }
    },
    //请求数据
    async created() {
        if (this.address !== this.curRootWallet.address || !this.curQueryWallet) {
            this.queryBalance(this.address);
        }
    },
    async mounted() {}
};
</script>

<style scoped></style>
