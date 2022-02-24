<template>
    <div
        class="box-cat-item"
        :class="{ app: app, disable: source === 'list' }"
        v-if="nftItem.preview"
    >
        <main>
            <!-- NFT 2D展示 -->
            <div
                class="box-cat-part-item"
                v-if="nftItem.preview.type === 'images'"
            >
                <template v-if="checkIsArray(renderData)">
                    <div
                        v-for="catChild in renderData"
                        :key="catChild.id"
                        class="box-cat-item-img"
                        :style="{ 'z-index': catChild.z }"
                    >
                        <img :src="catChild.url" v-if="catChild.url" />
                    </div>
                </template>
                <template v-else>
                    <div class="box-cat-item-img">
                        <img :src="renderData" alt="" />
                    </div>
                </template>
            </div>

            <!-- 3D渲染 -->
            <div class="box-cat-part-item" id="three" v-else>
                <div class="spinner"></div>
            </div>
        </main>

        <!-- 按钮 -->
        <div class="btn-sell" @click="sellCat(nftItem)" v-if="showSell">
            Sell
        </div>
    </div>
</template>

<script>
import UTILS from "@/config/util";
import threeRender from "@/config/threeRender";

export default {
    //部件
    components: {},
    //静态
    props: {
        nftItem: {
            type: Object,
            default: {}
        },
        showSell: {
            type: Boolean,
            default: false
        },
        app: {
            type: Boolean,
            default: false
        },
        source: {
            type: String,
            default: ""
        }
    },
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        renderData() {
            return this.nftItem.preview?.renderUrl;
        }
    },
    //数据
    data() {
        return {};
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        checkIsArray(arr) {
            return UTILS.checkIsArray(arr);
        },
        sellCat(cat) {
            this.$emit("sell", cat);
        }
    },
    //请求数据
    created() {},
    mounted() {
        const { type, renderUrl } = this.nftItem.preview;

        if (type !== "images") {
            const app = new threeRender("#three", location);

            console.log(renderUrl);
            let url =
                "https://test-initialworld.mypinata.cloud/ipfs/bafybeicyudydmtuidjae5w4h7nbbiaiordh5esvc3aso5nfgtqqatftofi";
            app.view(renderUrl, type);
        }
    }
};
</script>

<style scoped lang="scss">
.box-cat-item {
    width: 150px;
    position: relative;

    &.disable::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 9999;
        background-color: rgba($color: #000000, $alpha: 0);
    }

    &.app {
        width: 83px;

        main {
            min-height: 125px;
        }
    }

    .div-#{index} {
        z-index: 100 - index;
    }

    main {
        position: relative;
        min-height: 210px;
        border-radius: 4px;
        overflow: hidden;
        background-color: #fff;

        .box-cat-part-item {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        .box-cat-item-img {
            @extend .box-cat-part-item;
        }
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    .btn-sell {
        height: 54px;
        margin-top: 27px;
        @include btn-common;
    }
}
.box-sell-modal-img {
    width: 180px;

    main {
        height: 270px;
    }
}
</style>
