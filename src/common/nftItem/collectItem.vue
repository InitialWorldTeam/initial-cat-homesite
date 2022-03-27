<template>
    <div 
        class="box-cat-item" 
        :class="{ 
            app: app,
            burned: isBurned
        }"
        :style="customStyle"
        v-if="nftItem.preview"
    >
        <main :style="customStyle">
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
                        <img :src="renderData" />
                    </div>
                </template>
            </div>

            <!-- 3D渲染 -->
            <div class="box-cat-part-item" id="three" v-else>
                <div class="spinner"></div>
            </div>
        </main>
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
        },
        customStyle: {
            type: Object,
            default: null
        },
    },
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        renderData() {
            return this.nftItem.preview?.renderUrl;
        },
        renderType() {
            // 返回资源类型
            return this.nftItem.preview?.type === "images" ? "img" : "three";
        },
        isBurned() {
            return this.nftItem?.burned.length > 0;
        }
    },
    //数据
    data() {
        return {
            TYPE: {
                img: "IMAGE",
                three: "3D"
            }
        };
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
            const render = new threeRender("#three", location, {
                bgColor: "0x121018"
            });
            render.view(renderUrl, type);
        }
    }
};
</script>

<style scoped lang="scss">
.box-cat-item {
    position: relative;
    border-radius: 6px;
    width: 600px;

    &.app {
        width: 83px;

        main {
            min-height: 125px;
        }
    }

    &.burned {
        &::after {
            content: "burned already";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 99999;
            background-color: rgba($color: #000, $alpha: 0.8);
            @include flexCenter;
            font-size: 36px;
            line-height: 50px;
        }
    }

    .div-#{index} {
        z-index: 100 - index;
    }

    main {
        position: relative;
        height: 600px;
        overflow: hidden;
        background-color: #121018;

        .box-cat-part-item {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        .box-cat-item-img {
            @extend .box-cat-part-item;
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
