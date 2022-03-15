<template>
    <div></div>
</template>

<script>
import common from '@/common/common';

export default {
    mixins: [ common ],
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        nftId() {
            return [this.$route.params?.id];
        },
        saleAble() {
            return this.curRootWallet?.address === this.collectibles?.rootowner ? true : false;
        },
        renderType() {
            // 返回资源类型
            return this.collectibles.preview?.type === "images" ? "img" : "three";
        },
        isBurned() {
            return this.collectibles?.burned.length > 0;
        }
    },
    //数据
    data() {
        return {
            showPopover: false,
            collectibles: null,
            loading: true,
            TYPE: {
                img: "IMAGE",
                three: "3D"
            }
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        handleInspect(nft) {
            if (this.isBurned) {
                return;
            }
            const { metadata } = nft;
            let url = metadata.replace('ipfs://ipfs/', 'https://ipfs-scan.io/?cid=');
            window.open(url);
        },
        handleShareTwitter() {
            this.showPopover = false;
            this.$nextTick(() => {
                let url = 'https://twitter.com/InitialWorldLab';
                window.open(url);
            })
        }
    },
    //请求数据
    async created() {
        const NFT_DATA = await this.queryNftData([this.nftId]);
        this.collectibles = NFT_DATA[0];
        this.loading = false;
    },
    mounted() {}
};
</script>

<style scoped></style>
