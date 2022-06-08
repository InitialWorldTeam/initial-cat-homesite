<template>
    <div class="container-my-nfts">
        <template>
            <!-- Address Info -->
            <div class="box-address">
                <h1>My Wallet Address</h1>
                <div>
                    <p>{{ curRootWallet.address }}</p>
                    <i
                        class="btn-copy"
                        v-clipboard:copy="curRootWallet.address"
                        v-clipboard:success="onCopy"
                    >
                    </i>
                </div>
            </div>

            <div class="box-nft-list">
                <!-- Select Type -->
                <div class="box-type">
                    <span>Type:</span>
                    <div class="box-type-content">
                        <span
                            v-for="item in typeList"
                            :key="item.id"
                            :class="{ cur: item.name === curType }"
                            @click="selectType(item)"
                        >
                            {{ item.name }}
                        </span>
                    </div>
                </div>

                <main class="box-nft-list-content">
                    <!-- own NFT -->
                    <section
                        v-if="loadingNftSta === 1"
                        class="section-nftList-pc"
                    >
                        <template v-for="(item, index) in curPageNftList">
                            <div :key="item.id" class="box-nft">
                                <nft-item
                                    :nftItem="item"
                                    :index="index"
                                    source="list"
                                    @sell="sellCat"
                                ></nft-item>
                            </div>
                        </template>
                    </section>
                    <!-- no NFT -->
                    <template v-if="loadingNftSta === 2">
                        <div class="box-empty-nft"></div>
                    </template>
                </main>

                <!-- Pagination -->
                <div class="box-pagination flexCenter">
                    <el-pagination
                        :hide-on-single-page="isHideSinglePage"
                        layout="prev, pager, next"
                        :page-size="nftPageSize"
                        :pager-count="5"
                        :current-page="curPage"
                        @current-change="handlePageChange"
                        :total="nftTotalNum">
                    </el-pagination>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import Base from "./base";
import NftItem from "@/common/nftItem/index.vue";

export default {
    mixins: [Base],
    //部件
    components: {
        NftItem,
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
.box-pagination {
    margin-top: 20px;

    .el-pagination {
        color: #303133;

        button {

            &:disabled {
                color: #303133;
            }
        }
    }

    .el-pager li, .el-pagination .btn-next, .el-pagination .btn-prev {
        background: transparent;
    }
    .el-pagination .btn-next, .el-pagination .btn-prev {
        color: #c0c4cc;
    }
}
.container-my-nfts {
    padding: 35px 17px 24px;

    .box-nft-list {
        border-top: 1px solid #e9e9ea;
        padding-top: 10px;

        .box-nft-list-content  {
            min-height: 280px;
            padding-top: 16px;

            .section-nftList-pc {
                display: grid;
                grid-gap: 20px;
                grid-template-columns: repeat(2, minmax(0px, 1fr));
            }

            .box-cat-item {
                min-height: 200px;
            }

            .box-empty-nft {
                height: 170px;
                margin-top: 98px;
                background: url(../img/img-noNft.png) no-repeat center top /
                    240px auto;
            }
        }

        .box-type {
            // height: 42px;
            display: flex;
            font-size: 12px;
            font-weight: 400;
            color: #545356;
            line-height: 24px;

            span {
                margin-right: 19px;
                cursor: pointer;

                &.cur {
                    color: #a06ff8;
                }
            }
        }
    }

    .box-address {
        padding-bottom: 36px;
        text-align: center;

        h1 {
            font-size: 20px;
            font-weight: bold;
            color: #545356;
            line-height: 22px;
            margin-bottom: 10px;
        }

        > div {
            @include flex;
            font-size: 10px;
            font-weight: 400;
            color: #848484;
            line-height: 15px;

            p {
                @include ellipsis;
                max-width: 90%;
            }

            .btn-copy {
                @include bg-item;
                width: 12px;
                height: 12px;
                background-image: url(../img/img-copy.png);
                margin-left: 15px;
                cursor: pointer;
            }
        }
    }
}
</style>