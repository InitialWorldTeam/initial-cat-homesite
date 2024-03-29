<template>
    <div
        class="container-collectibles"
        :class="{'burned': isBurned}"
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
            <div class="box-info">
                <div class="box-left">
                    <h1 class="flex">
                        <span>{{ collectibles.collection }}</span>
                        <span :class="[renderType]" class="box-tag">{{
                            TYPE[renderType]
                        }}</span>
                    </h1>
                    <h2>{{ collectibles.symbol }}</h2>
                    <div class="box-own">
                        Owned By: <span>{{ collectibles.rootowner }}</span>
                    </div>
                </div>

                <div class="box-right flex">
                    <div class="btn-item" @click="handleInspect(collectibles)">
                        <span>Inspect</span><i class="inspect"></i>
                    </div>

                    <div class="btn-item" v-if="isBurned">
                        <span>Share</span><i class="share"></i>
                    </div>

                    <el-popover 
                        placement="bottom" 
                        width="140" 
                        trigger="click" 
                        v-model="showPopover"
                        v-else
                    >
                        <div>
                            <el-button 
                                round 
                                class="btn-share-twitter"
                                @click="handleShareTwitter"
                            ><i class="box-twitter"></i> Twitter</el-button>
                        </div>
                        <div slot="reference" class="btn-item">
                            <span>Share</span><i class="share"></i>
                        </div>
                    </el-popover>
                </div>
            </div>

            <!-- Sale -->
            <div class="box-sale">
                <el-tooltip
                    effect="dark"
                    content="Coming soon"
                    placement="bottom"
                    popper-class="popper-coming"
                    v-if="saleAble"
                >
                    <div class="box-sale-item sale">
                        List for sale
                    </div>
                </el-tooltip>

                <div class="box-sale-item no" v-else>Not for sale</div>
            </div>
        </main>
    </div>
</template>

<script>
import Base from "./base";
import NftItem from "@/common/nftItem/collectItem.vue";

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

    &.burned {
        .btn-item, .box-sale-item {
            background-color: #c8c9cc!important;
            color: #fff!important;
        }
    }

    main {
        @extend .common-pc-width;
        margin: 0 auto;
        padding-bottom: 188px;
    }

    .box-display {
        @include flexCenter;
        height: 600px;
        margin: 0 auto 60px;
    }

    .box-info {
        display: flex;
        justify-content: space-between;

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

            .box-own {
                font-size: 14px;
                line-height: 30px;
                display: flex;
                margin-top: 14px;

                span {
                    display: block;
                    padding-left: 34px;
                    margin-left: 10px;
                    background: url(../img/img-owner.png) no-repeat left center /
                        30px auto;
                }
            }
        }

        .box-right {
            height: 40px;

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

    .box-tag {
        padding: 0 4px;
        border-radius: 4px;
        border-width: 0.5px;
        border-style: solid;
        font-size: 14px;
        height: 24px;
        @include flexCenter;
        margin-left: 10px;

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
</style>
