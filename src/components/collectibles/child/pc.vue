<template>
    <div
        class="container-collectibles"
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <main v-if="collectibles">
            <!-- Display -->
            <div class="box-display">
                <nft-item :nftItem="collectibles"></nft-item>
            </div>

            <!-- Info -->
            <div class="box-info flexBetween">
                <div class="box-left">
                    <h1>{{ collectibles.collection }}</h1>
                    <h2>{{ collectibles.symbol }}</h2>
                </div>

                <div class="box-right flex">
                    <div class="btn-item">
                        <span>Inspect</span><i class="inspect"></i>
                    </div>
                    <div class="btn-item">
                        <span>Share</span><i class="share"></i>
                    </div>
                </div>
            </div>

            <!-- Sale -->
            <div class="box-sale">
                <div class="box-sale-item sale" v-if="saleAble">
                    List for sale
                </div>
                <div class="box-sale-item no" v-else>Not for sale</div>
            </div>
        </main>
    </div>
</template>

<script>
import Base from "./base";
import NftItem from "@/common/nftItem";

export default {
    mixins: [Base],
    //部件
    components: {
        NftItem
    },
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {},
    //数据
    data() {
        return {};
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {},
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped lang="scss">
.container-collectibles {
    padding-top: 106px;
    min-height: 100vh;

    main {
        @extend .common-pc-width;
        margin: 0 auto;
        padding-bottom: 188px;
    }

    .box-display {
        @include flexCenter;
        height: 420px;
        margin: 0 auto 60px;
    }

    .box-info {
        .box-left {
            h1 {
                font-size: 34px;
                line-height: 36px;
                font-family: FuturaT;
                font-weight: normal;
                color: #ffffff;
            }

            h2 {
                font-size: 18px;
                line-height: 20px;
                font-family: Myriad Pro;
                font-weight: 400;
                color: #818189;
                margin-top: 18px;
            }
        }

        .box-right {
            .btn-item {
                @include btn-common;
                height: 40px;
                width: 112px;
                font-size: 16px;
                line-height: 20px;
                padding: 0 10px;
                color: #110f19;
                letter-spacing: 0px;
                margin-left: 16px;

                i {
                    display: block;
                    @include bg-item;
                    margin-left: 10px;

                    &.inspect {
                        background-image: url(../img/icon-inspect.png);
                        width: 13px;
                        height: 18px;
                    }

                    &.share {
                        background-image: url(../img/icon-share.png);
                        width: 16px;
                        height: 16px;
                    }
                }
            }
        }
    }

    .box-sale {
        margin-top: 40px;

        .box-sale-item {
            width: 300px;
            height: 40px;
            @include btn-common;
            font-size: 16px;

            &.sale {
                background-color: #37cd72;
                color: #fff;
            }

            &.no {
                background-color: rgba($color: #ccc, $alpha: 0.2);
                color: #eee;
            }
        }
    }
}
</style>
