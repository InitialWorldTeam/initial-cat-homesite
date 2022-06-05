<template>
    <div
        class="container-collectibles"
        :class="{'burned': isBurned}"
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >   
        <div class="btn-back-v2" @click="goToBack">Back to My NFTs</div>

        <main v-if="collectibles">
            <!-- Display -->
            <div class="box-display">
                <nft-item :nftItem="collectibles"></nft-item>
            </div>

            <!-- Info -->
            <div class="box-info">
                <div class="box-left">
                    <h1 class="flex">
                        <span class="name">{{ collectibles.collection }}</span>
                        <span :class="[renderType]" class="box-tag">
                            {{ TYPE[renderType] }}</span>
                    </h1>
                    <h2>{{ collectibles.sn }}</h2>
                    <div class="box-own">
                        Owned By: <span>{{collectibles.rootowner}}</span>
                    </div>
                </div>

                <div class="box-right">
                    <div class="btn-item" @click="handleInspect(collectibles)">
                        <span>Inspect</span>
                    </div>

                    <div class="btn-item share">
                        <span>Share</span>
                    </div>

                    <el-popover 
                        placement="top" 
                        width="140" 
                        trigger="click" 
                        v-model="showPopover"
                        v-if="fasle"
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
            <div class="box-sale" v-if="false">
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
    padding-top: 26px;
    height: 100%;

    &.burned {
        .btn-item, .box-sale-item {
            background-color: #c8c9cc!important;
            color: #fff!important;
        }
    }

    main {
        // @extend .common-pc-width;
        margin: 0 auto;
        padding: 26px 18px 0px 18px;
    }

    .box-display {
        @include flexCenter;
        width: 70vw;
        height: 70vw;
        margin: 0 auto 34px;

        .box-cat-item {
            width: 100vw;
        }
    }

    .box-info {

        .box-left {
            h1 {
                font-size: 17px;
                line-height: 24px;
                font-weight: normal;
                color: #545356;
                display: flex;
                
                .name {
                    @include ellipsis;
                    width: 85%;
                }
            }

            h2 {
                font-size: 11px;
                line-height: 17px;
                font-family: Myriad Pro;
                font-weight: 400;
                color: #818189;
                margin-top: 8px;
            }

            .box-own {
                font-size: 10px;
                line-height: 20px;
                display: flex;
                margin-top: 14px;
                color: #545356;

                span {
                    display: block;
                    // padding-left: 24px;
                    margin-left: 10px;
                    // background: url(../img/img-owner.png) no-repeat left center / 20px auto;
                    width: calc(100% - 90px);
                    @include ellipsis;
                }
            }
        }

        .box-right {
            height: 40px;
            margin-top: 38px;
            display: flex;
            gap: 10px;

            .btn-item {
                @include btn-common;
                height: 38px;
                flex: 1;
                font-size: 14px;
                line-height: 20px;
                padding: 0 10px;
                background: #A06FF8;
                color: #fff;
                border-radius: 9px;

                &.share {
                    background: #ccc;
                }

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
        margin-top: 24px;

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