<template>
    <div class="container-myNft">
        <main>
            <!-- My Wallet Address -->
            <div class="box-wallet-adderss">
                <h1 class="h1">My Wallet Address</h1>
                <h2 v-if="curQueryWallet">
                    <span v-text="urlAddress"></span>
                    <i
                        class="btn-copy"
                        v-clipboard:copy="urlAddress"
                        v-clipboard:success="onCopy"
                    ></i>
                </h2>
                <section>
                    <div class="box-wallet-info-item">
                        <h3>My NFTs</h3>
                        <div class="box-num" id="assetNum">0</div>
                    </div>
                    <div class="box-wallet-info-item">
                        <h3>Balance</h3>
                        <div class="box-num">0.00 NIC</div>
                        <p>$ 0.00</p>
                    </div>
                    <div class="box-wallet-info-item">
                        <h3>Balance</h3>
                        <div class="box-num box-num-ksm">
                            <span
                                
                                id="balance"
                                >0.00</span
                            >
                            <!-- <span v-else>0.00</span> -->
                            KSM
                        </div>
                        <p>$ 0.00</p>
                    </div>
                </section>
            </div>

            <!-- My NFTs -->
            <div class="box-my-nft">
                <h1 class="h1">My NFTs</h1>
                <!-- Connect Wallet -->
                <div
                    class="box-NftList"
                    v-if="curQueryWallet"
                    v-loading="loadingNftSta === 0"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                    <!-- own NFT -->
                    <section v-if="loadingNftSta === 1">
                        <template v-for="(item,index) in myNftAssets">
                            <div
                                :key="item.id"
                                class="box-nft"
                                @click="goToDetail(item)"
                            >
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
                </div>
                <!-- Disconnect -->
                <div class="box-no-connect" v-if="false">
                    <div class="btn-connect-wallet" @click="initWallet">
                        Connect Wallet
                    </div>
                </div>
            </div>
        </main>

        <!-- Sell Modal -->
        <transition name="fade">
            <div
                class="box-sell-modal"
                v-if="isShowSellModal"
                @click="clearCellCat"
            >
                <main @click.stop>
                    <h1>Sell</h1>
                    <div>
                        <nft-item
                            class="box-sell-modal-img"
                            :nftItem="curSellCat"
                        ></nft-item>
                    </div>
                    <h3 v-text="curSellCat.symbol"></h3>
                    <div class="box-input">
                        <!-- 允许输入数字，调起带符号的纯数字键盘 -->
                        <van-field
                            class="box-cat-sell-input"
                            v-model="sellPrice"
                            type="number"
                            label="Selling price(KSM)"
                            label-width="200"
                            label-class="cat-sell-label"
                            input-align="right"
                            :border="false"
                        />
                    </div>
                    <div class="btn-approve" @click="clearCellCat">
                        Approve NFT
                    </div>
                    <p>
                        After the transaction is successful, a 2.5% handling fee
                        will be charged.
                    </p>
                </main>
            </div>
        </transition>

        <!-- Test Transfer -->
        <div class="box-test-transfer" v-if="false">
            <van-field v-model="targetStr" label="地址" />
            <van-field v-model="targetNum" type="number" label="数量" />
            <div class="btn-test" @click="testSend">发送</div>
        </div>
    </div>
</template>

<script>
import Base from "./base";
import NftItem from "@/common/nftItem/index.vue";

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
        return {
            targetStr: "",
            targetNum: "0"
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        testSend() {
            this.transferToken(this.targetStr, this.targetNum);
        }
    },
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped lang="scss">
.container-myNft {
    padding-top: 156px;

    main {
        @extend .common-pc-width;
        margin: 0 auto;
        padding-bottom: 188px;
    }

    .h1 {
        font-size: 34px;
        line-height: 44px;
        font-family: FuturaT;
        font-weight: normal;
        color: #ffffff;
    }

    .box-wallet-adderss {
        h2 {
            font-size: 20px;
            line-height: 24px;
            font-weight: 400;
            color: #818189;
            margin-top: 18px;
            letter-spacing: -1.3px;
            @include flex;

            .btn-copy {
                width: 18px;
                height: 20px;
                margin-left: 12px;
                @include bg-item;
                background-image: url(../../../assets/img/myCat/icon-copy.png);
                cursor: pointer;
            }
        }

        section {
            height: 172px;
            background-color: #fff;
            padding: 43px 0 0 66px;
            border-radius: 8px;
            display: flex;
            margin-top: 44px;

            .box-wallet-info-item {
                flex: 1;

                h3 {
                    font-size: 22px;
                    line-height: 16px;
                    font-weight: 400;
                    color: #110f19;
                    margin-bottom: 24px;
                }
                .box-num {
                    padding-left: 42px;
                    background: url(../../../assets/img/common/img-logo-auto.png)
                        no-repeat left center / 29px auto;
                    font-size: 32px;
                    line-height: 30px;
                    font-weight: bold;
                    color: #110f19;

                    &.box-num-ksm {
                        background-image: url(../../../assets/img/common/img-logo-ksm.png);
                    }
                }

                p {
                    font-size: 18px;
                    line-height: 16px;
                    font-weight: 400;
                    color: #818189;
                    padding-left: 39px;
                    margin-top: 7px;
                }
            }
        }
    }

    .box-my-nft {
        margin-top: 75px;

        .box-NftList {
            min-height: 226px;
            margin-top: 35px;
            border-radius: 10px;
            overflow: hidden;

            section {
                display: flex;
                flex-wrap: wrap;
                padding-left: 46px;
            }

            .box-nft {
                cursor: pointer;
                margin-bottom: 40px;

                &:not(:last-child) {
                    margin-right: 60px;
                }
            }
        }

        .box-empty-nft {
            height: 170px;
            margin-top: 58px;
            background: url(../../../assets/img/myCat/img-noNft.png) no-repeat
                center top / 240px auto;
        }

        .box-no-connect {
            margin-top: 57px;
            padding-top: 146px;
            @include flexCenter;
            background: url(../../../assets/img/common/img-wallet-empty.png)
                no-repeat center top / 124px auto;

            .btn-connect-wallet {
                @include btn-common;
                height: 50px;
                width: 210px;
                font-size: 20px;
                line-height: 24px;
                padding: 0 10px;
                color: #110f19;
                letter-spacing: 0px;
            }
        }
    }
}

.box-sell-modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: rgba($color: #000000, $alpha: 0.5);
    @include flexCenter;

    > main {
        width: 600px;
        height: 680px;
        background: #110f19;
        border-radius: 12px;
        padding: 35px 50px 0;
        @include flex;
        flex-direction: column;

        h1 {
            font-size: 32px;
            line-height: 24px;
            font-weight: normal;
            color: #ffffff;
            margin-bottom: 42px;
        }

        .box-sell-img {
            width: 180px;
            height: 270px;
        }

        h3 {
            line-height: 13px;
            font-size: 18px;
            font-family: Myriad Pro;
            font-weight: 400;
            color: #ffffff;
            margin-top: 14px;
        }

        .box-input {
            width: 500px;
            height: 66px;
            border: 2px solid #818189;
            border-radius: 12px;
            margin-top: 48px;
        }

        .box-cat-sell-input {
            height: 100%;
            background-color: transparent;
        }

        .btn-approve {
            @include btn-common;
            width: 500px;
            height: 66px;
            border-radius: 12px;
            font-size: 22px;
            margin-top: 21px;
        }

        p {
            font-size: 14px;
            line-height: 14px;
            font-family: Myriad Pro;
            font-weight: 400;
            color: #61616b;
            margin-top: 18px;
            letter-spacing: -1px;
        }
    }
}
</style>
