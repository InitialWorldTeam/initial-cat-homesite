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
                    <span
                        v-for="item in typeList"
                        :key="item.id"
                        :class="{ cur: item.name === curType }"
                        @click="selectType(item)"
                    >
                        {{ item.name }}
                    </span>
                </div>

                <main>
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
.container-my-nfts {
    padding: 45px;

    .box-nft-list {
        border-top: 1px solid #e9e9ea;

        main {
            .section-nftList-pc {
                display: grid;
                grid-gap: 20px;
                grid-template-columns: repeat(4, minmax(0px, 1fr));
            }

            .box-empty-nft {
                height: 170px;
                margin-top: 98px;
                background: url(../img/img-noNft.png) no-repeat center top /
                    240px auto;
            }
        }

        .box-type {
            height: 42px;
            @include flex;
            font-size: 16px;
            font-weight: 400;
            color: #545356;
            line-height: 24px;

            span {
                margin-right: 16px;
                cursor: pointer;

                &.cur {
                    color: #a06ff8;
                }
            }
        }
    }

    .box-address {
        padding-bottom: 36px;

        h1 {
            font-size: 28px;
            font-weight: bold;
            color: #545356;
            line-height: 40px;
            margin-bottom: 12px;
        }

        > div {
            @include flex;
            font-size: 16px;
            font-weight: 400;
            color: #848484;
            line-height: 24px;

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
