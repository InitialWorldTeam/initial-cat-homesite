<template>
    <div class="box-swapkey-item" :class="{ app: isApp}">
        <div class="box-nft-show">
            <NftShowItem
                :nftItem="nftData"
                :customStyle="nftStyle"
                v-if="nftData"
            ></NftShowItem>
        </div>

        <section>
            <div class="box-info">
                <span class="name">{{ formatName }}</span>
                <span 
                    :class="[renderType]" 
                    class="box-tag">
                    {{ TYPE[renderType] }}
                </span>
            </div>
            <h3>{{ title }}</h3>
        </section>

        <div class="box-use-key" v-if="isApp" @click="handleUse">
            <span class="btn-use">USE</span>
        </div>

        <div class="box-use-key" v-else>
            <span class="btn-use" @click="handleUse">USE</span>
        </div>
    </div>
</template>

<script>
import NftShowItem from "@/common/nftItem/collectItem";
import common from "../common";

export default {
    mixins: [common],
    props: {
        title: {
            type: String,
            default: ""
        },
        swap: {
            type: String,
            default: ""
        }
    },
    //部件
    components: {
        NftShowItem
    },
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        nftStyle() {
            let stylePc = {
                width: "210px",
                height: "210px",
                bgColor: "0xAFBFFF"
            };
            let styleApp = {
                width: "39.2vw",
                height: "39.2vw",
                bgColor: "0xAFBFFF"
            };
            return this.isApp ? styleApp : stylePc;
        },
        formatName() {
            const arr = this.swap.split("-");
            return arr[arr.length - 1];
        },
        renderType() {
            // 返回资源类型
            return this.nftData?.preview?.type === "images" ? "img" : "three";
        }
    },
    //数据
    data() {
        return {
            nftData: null,
            TYPE: {
                img: "IMAGE",
                three: "3D"
            }
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        handleUse() {
            this.$emit('use');
        },
        async getNftData() {
            const NFT_DATA = await this.queryNftData([this.swap]);
            this.nftData = NFT_DATA[0];
        }
    },
    //请求数据
    created() {},
    async mounted() {
        this.getNftData();
    }
};
</script>

<style lang="scss">
.box-swapkey-item {
    border-radius: 8px;
    overflow: hidden;
    position: relative;

    &.app {
        >section {
            height: 55px;
            padding: 12px;

            .box-info {
                .name {
                    font-size: 11px;
                }
                .box-tag {
                    height: 14px;
                    font-size: 11px;
                    padding: 0 3px;
                }
            }

            h3 {
                font-size: 12px;
                line-height: 14px;
                margin-top: 6px;
                @include ellipsis;
            }
        }

        &:hover {
            .box-use-key {
                opacity: 0;
            }
        }
        .btn-use {
            pointer-events: auto;
        }
    }
    
    &:hover {
        .box-use-key {
            opacity: 1;
        }
    }

    .box-nft-show {
        min-height: 210px;
        width: 210px;
        background: linear-gradient(0deg, #AFBFFF 0%, #9786F3 100%);
    }

    .box-use-key {
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.6);
        left: 0;
        top: 0;
        @include flexCenter;
        opacity: 0;
        transition: all .3s ease;

        .btn-use {
            width: 126px;
            height: 40px;
            border-radius: 8px;
            @include flexCenter;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            line-height: 24px;
            cursor: pointer;
            background: #01A28D;
            cursor: pointer;
        }
    }

    .box-cat-item {
        border-radius: 0px;

        main {
            border-radius: 0px;
        }
    }

    > section {
        height: 70px;
        background: #51379b;
        padding: 14px 13px 14px 18px;
        color: #fff;

        .box-info {
            @include flexBetween;

            .name {
                font-size: 14px;
                line-height: 1;
            }

            .box-tag {
                height: 17px;
                border: 1px solid #B48AFF;
                border-radius: 4px;
                font-size: 12px;
                font-family: Myriad Pro;
                font-weight: 400;
                color: #B48AFF;
                padding: 0 6px;
                @include flexCenter;
            }
        }

        h3 {
            font-size: 16px;
            line-height: 1;
            margin-top: 8px;
            font-family: Myriad Pro;
            font-weight: bold;
            color: #FFFFFF;
        }
    }
}
</style>
