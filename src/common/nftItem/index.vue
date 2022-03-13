<template>
    <div
        class="box-cat-item"
        :class="{ app: app }"
        v-if="nftData"
    >
        <main @click="goToDetail">
            <!-- NFT 2D展示 -->
            <div
                class="box-cat-part-item"
                v-if="nftData.preview.type === 'images'"
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
                        <img :src="renderData" />
                    </div>
                </template>
            </div>

            <!-- 3D渲染 -->
            <div class="box-cat-part-item three" :id="renderThreeId" v-else></div>
        </main>

        <!-- NFT信息 -->
        <div class="box-info" v-if="source === 'list'">
            <div class="box-1 flexBetween">
                <h6>{{ nftData.sn }}</h6>
                <span :class="[renderType]">{{ TYPE[renderType] }}</span>
            </div>
            <h1 class="box-name">{{ nftData.symbol }}</h1>
        </div>

        <!-- 按钮 -->
        <div class="btn-sell" @click="sellCat(nftData)" v-if="showSell">
            Sell
        </div>
    </div>
    <div
        v-else
        class="box-cat-item"
        :class="{ app: app, disable: source === 'list' }"
        v-loading="isLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    ></div>
</template>

<script>
import UTILS from "@/config/util";
import threeRender from "@/config/threeRender";
import common from "@/common/common";

export default {
    mixins: [common],
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
        },
        index: {
            type: Number,
            default: 0
        }
    },
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        renderData() {
            return this.nftData?.preview?.renderUrl;
        },
        renderType() {
            // 返回资源类型
            return this.nftData?.preview?.type === "images" ? "img" : "three";
        },
        renderThreeId() {
            return `three-${this.index}`;
        },
        isLoading() {
            return !Boolean(this.nftData);
        }
    },
    //数据
    data() {
        return {
            TYPE: {
                img: "IMAGE",
                three: "3D"
            },
            nftData: null
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        goToDetail() {
            const PATH = "/collectibles/" + this.nftData.id;
            this.$router.push({
                path: PATH
            });
        },
        checkIsArray(arr) {
            return UTILS.checkIsArray(arr);
        },
        sellCat(cat) {
            this.$emit("sell", cat);
        }
    },
    //请求数据
    created() {},
    async mounted() {
        const NFT_DATA = await this.queryNftData([this.nftItem]);
        this.nftData = NFT_DATA[0];

        const { type, renderUrl } = this.nftData?.preview;
        if (type !== "images") {
            this.$nextTick(() => {
                const app = new threeRender(`#${this.renderThreeId}`, location);
                app.view(renderUrl, type);
            })
        }
    }
};
</script>

<style scoped lang="scss">
.box-cat-item {
    position: relative;
    width: 100%;
    min-height: 230px;
    border-radius: 6px;

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
        width: 40vw;
        min-height: 53vw;

        main {
            min-height: 40vw;
            padding: 0;
        }

        .box-info {
            .box-name {
                font-size: 10px;
                line-height: 14px;
                margin-top: 4px;
            }
        }
    }

    .div-#{index} {
        z-index: 100 - index;
    }

    > main {
        position: relative;
        width: 100%;
        height: 0px;
        padding-bottom: 100%;
        min-width: auto;
        overflow: hidden;
        background-color: #000;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;

        .box-cat-part-item {
            position: absolute;
            width: 100%;
            height: 100%;

            &.three {
                pointer-events: none;
            }
        }

        .box-cat-item-img {
            @extend .box-cat-part-item;
            padding: 6px;
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            min-width: 100%;
            min-height: 100%;
            inset: 0px;
            box-sizing: border-box;
            object-fit: contain;
        }
    }

    .box-info {
        padding: 10px 12px;
        background-color: rgba($color: #eee, $alpha: 0.95);
        color: $fontColor-3;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;

        .box-1 {
            font-size: 10px;

            span {
                display: block;
                padding: 0 4px;
                border-width: 0.5px;
                border-style: solid;
                border-radius: 2px;

                &.img {
                    border-color: rgb(235, 48, 137);
                    color: rgb(235, 48, 137);
                }
                &.three {
                    border-color: rgb(128, 90, 213);
                    color: rgb(128, 90, 213);
                }
            }
        }

        .box-name {
            font-size: 16px;
            line-height: 24px;
            margin-top: 6px;
            @include ellipsis;
        }
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
