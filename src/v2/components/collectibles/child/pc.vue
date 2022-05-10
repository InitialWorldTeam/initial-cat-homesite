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
            <div class="box-nft-detail-show">
                <nft-item :nftItem="collectibles"></nft-item>
            </div>

            <!-- Info -->
            <div class="box-info">
                <div class="box-left">
                    <h1 class="flex">
                        <span class="name">{{ collectibles.collection }}</span>
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
                        <span>Inspect</span>
                    </div>

                    <div class="btn-item no">
                        <span>Share</span>
                    </div>

                    <!-- share pop -->
                    <el-popover 
                        placement="bottom" 
                        width="140" 
                        trigger="click" 
                        v-model="showPopover"
                        v-if="false"
                    >
                        <div>
                            <el-button 
                                round 
                                class="btn-share-twitter"
                                @click="handleShareTwitter"
                            ><i class="box-twitter"></i> Twitter</el-button>
                        </div>
                        <div slot="reference" class="btn-item">
                            <span>Share</span>
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
    padding: 48px 0;

    &.burned {
        .btn-item, .box-sale-item {
            background-color: #c8c9cc!important;
            color: #fff!important;
        }
    }

    main {
        padding: 22px 56px 0;
    }

    .box-nft-detail-show {
        @include flexCenter;
    }

    .box-info {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;

        .box-left {
            h1 {
                font-size: 22px;
                line-height: 24px;
                font-weight: bold;
                
                .name {
                    @include ellipsis;
                    max-width: 400px;
                }
            }

            h2 {
                font-size: 14px;
                line-height: 14px;
                font-weight: 400;
                color: #848484;
                margin-top: 10px;
            }

            .box-own {
                font-size: 14px;
                line-height: 20px;
                display: flex;
                color: #545356;
                margin-top: 19px;

                span {
                    margin-left: 4px;
                }
            }
        }

        .box-right {
            height: 44px;

            .btn-item {
                @include btn-common;
                height: 44px;
                width: 120px;
                font-size: 16px;
                line-height: 20px;
                padding: 0 10px;
                color: #fff;
                letter-spacing: 0px;
                margin-left: 12px;
                background-color: #A06FF8;
                border-radius: 8px;

                &.no {
                    background-color: #ccc;
                    cursor: auto;
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
        height: 18px;
        @include flexCenter;
        margin-left: 11px;

        &.img {
            border-color: #B48AFF;;
            color: #B48AFF;
        }
        &.three {
            border-color: rgb(128, 90, 213);
            color: rgb(128, 90, 213);
        }
    }
}
</style>
