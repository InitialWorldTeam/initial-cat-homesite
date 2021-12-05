<template>
    <div class="container-myCat">
        <main>
            <!-- My Wallet Address -->
            <div class="box-wallet-adderss">
                <h1 class="h1">My Wallet Address</h1>
                <h2>
                    <span v-text="curWallet.address"></span>
                    <i
                        class="btn-copy"
                        v-clipboard:copy="curWallet.address"
                        v-clipboard:success="onCopy"
                    ></i>
                </h2>
                <section>
                    <div class="box-wallet-info-item">
                        <h3>My Cat</h3>
                        <div class="box-num">03</div>
                    </div>
                    <div class="box-wallet-info-item">
                        <h3>Balance</h3>
                        <div class="box-num">0.00 IIC</div>
                        <p>$0.00</p>
                    </div>
                    <div class="box-wallet-info-item">
                        <h3>Balance</h3>
                        <div class="box-num box-num-ksm">0.00 KSM</div>
                        <p>$0.00</p>
                    </div>
                </section>
            </div>

            <!-- My Cat -->
            <div class="box-my-cat">
                <h1 class="h1">My Cat</h1>
                <section>
                    <div
                        v-for="item in myCatList"
                        :key="item.id"
                        class="box-cat-item"
                    >
                        <img :src="item.path" />
                        <div class="btn-sell" @click="sellCat(item)">Sell</div>
                    </div>
                </section>
            </div>
        </main>

        <!-- Sell Modal -->
        <transition name="fade">
            <div class="box-sell-modal" v-if="isShowSellModal" @click="clearCellCat">
                <main @click.stop>
                    <h1>Sell</h1>
                    <img class="box-sell-img" :src="curSellCat.path">
                    <h3 v-text="curSellCat.name"></h3>
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
                    <div class="btn-approve" @click="clearCellCat">Approve NFT</div>
                    <p>After the transaction is successful, a 2.5% handling fee will be charged.</p>
                </main>
            </div>
        </transition>
    </div>
</template>

<script>
import Base from "./base";

export default {
    mixins: [Base],
    //部件
    components: {},
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
.container-myCat {
    padding-top: 70px;

    main {
        width: 1400px;
        margin: 0 auto;
        padding-bottom: 188px;
    }

    .h1 {
        font-size: 42px;
        line-height: 44px;
        font-family: FuturaT;
        font-weight: normal;
        color: #ffffff;
    }

    .box-wallet-adderss {
        h2 {
            font-size: 26px;
            line-height: 28px;
            font-weight: 400;
            color: #818189;
            margin-top: 18px;
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
            height: 240px;
            background-color: #fff;
            padding: 60px 0 0 94px;
            display: flex;
            margin-top: 44px;

            .box-wallet-info-item {
                flex: 1;

                h3 {
                    font-size: 32px;
                    line-height: 32px;
                    font-weight: 400;
                    color: #110f19;
                    margin-bottom: 24px;
                }
                .box-num {
                    padding-left: 52px;
                    background: url(../../../assets/img/common/img-logo-auto.png)
                        no-repeat left center / 40px auto;
                    font-size: 46px;
                    line-height: 48px;
                    font-weight: bold;
                    color: #110f19;

                    &.box-num-ksm {
                        background-image: url(../../../assets/img/common/img-logo-ksm.png);
                    }
                }

                p {
                    font-size: 24px;
                    line-height: 24px;
                    font-weight: 400;
                    color: #818189;
                    padding-left: 52px;
                    margin-top: 12px;
                }
            }
        }
    }

    .box-my-cat {
        margin-top: 87px;

        section {
            margin-top: 35px;
            display: flex;
            flex-wrap: wrap;
            padding-left: 46px;

            .box-cat-item {
                width: 166px;
                margin-bottom: 36px;

                &:not(:last-child) {
                    margin-right: 80px;
                }

                img {
                    display: block;
                    height: 250px;
                    margin-bottom: 24px;
                }

                .btn-sell {
                    height: 54px;
                    @include btn-common;
                }
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

    main {
        width: 700px;
        height: 800px;
        background: #110f19;
        border-radius: 12px;
        padding: 45px 70px 0;
        @include flex;
        flex-direction: column;

        h1 {
            font-size: 32px;
            line-height: 24px;
            font-weight: normal;
            color: #FFFFFF;
            margin-bottom: 42px;
        }

        .box-sell-img {
            width: 195px;
            height: 294px;
        }

        h3 {
            line-height: 16px;
            font-size: 22px;
            font-family: Myriad Pro;
            font-weight: 400;
            color: #FFFFFF;
            margin-top: 17px;
        }

        .box-input {
            width: 560px;
            height: 86px;
            border: 2px solid #818189;
            border-radius: 12px;
            margin-top: 62px;
        }

        .box-cat-sell-input {
            height: 100%;
            background-color: transparent;
        }

        .btn-approve {
            @include btn-common;
            width: 560px;
            height: 86px;
            border-radius: 12px;
            font-size: 32px;
            margin-top: 27px;
        }

        p {
            font-size: 18px;
            line-height: 20px;
            font-family: Myriad Pro;
            font-weight: 400;
            color: #61616B;
            margin-top: 14px;
            letter-spacing: -1px;
        }
    }
}
</style>
