<template>
    <div class="container-myCat container-myCat-app">
        <main>
            <!-- My Wallet Address -->
            <div class="box-wallet-adderss">
                <h1 class="h1">My Wallet Address</h1>
                <h2 v-if="curWallet">
                    <span v-text="curWallet.address"></span>
                    <i
                        class="btn-copy"
                        v-clipboard:copy="curWallet.address"
                        v-clipboard:success="onCopy"
                    ></i>
                </h2>
                <h2 v-else>--</h2>
                <section>
                    <div class="box-wallet-info-item box-1">
                        <h3>My Cat</h3>
                        <div class="box-num">03</div>
                    </div>
                    <div class="flex">
                        <div class="box-wallet-info-item box-2">
                            <h3>Balance</h3>
                            <div class="box-num">0.00 IIC</div>
                            <p>$0.00</p>
                        </div>
                        <div class="box-wallet-info-item box-2">
                            <h3>Balance</h3>
                            <div class="box-num box-num-ksm">0.00 KSM</div>
                            <p>$0.00</p>
                        </div>
                    </div>
                </section>
            </div>

            <!-- My Cat -->
            <div class="box-my-cat">
                <h1 class="h1">My Cat</h1>
                <section v-if="curWallet">
                    <div
                        v-for="item in myCatList"
                        :key="item.id"
                        class="box-cat-item"
                    >
                        <img :src="item.path" />
                        <div class="btn-sell" @click="sellCat(item)">Sell</div>
                    </div>
                </section>
                <section class="section-empty" v-else>
                    <div class="btn-connect" @click="initWallet">Connect Wallet</div>
                </section>
            </div>
        </main>

        <!-- Sell Modal -->
        <transition name="fade">
            <div class="box-sell-modal" v-if="isShowSellModal" @click="clearCellCat">
                <main @click.stop>
                    <template>
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
                    </template>
                    <!-- 关闭 -->
                    <div class="btn-close" @click="clearCellCat"></div>
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
    padding-top: 50px;

    main {
        padding-bottom: 125px;
    }

    .h1 {
        font-size: 23px;
        line-height: 23px;
        font-weight: normal;
        color: #ffffff;
        padding-left: 20px;
    }

    .box-wallet-adderss {
        h2 {
            font-size: 13px;
            line-height: 15px;
            font-weight: 400;
            color: #818189;
            margin-top: 18px;
            letter-spacing: -1.3px;
            @include flex;
            padding-left: 20px;

            .btn-copy {
                width: 9px;
                height: 10px;
                margin-left: 6px;
                @include bg-item;
                background-image: url(../../../assets/img/myCat/icon-copy.png);
                cursor: pointer;
            }
        }

        section {
            height: 200px;
            background-color: #fff;
            padding: 0 20px;
            margin-top: 20px;
            position: relative;

            &::before {
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                width: calc(200vw - 80px);
                height: .5px;
                background: #DADADA;
                z-index: 1;
                transform: translate(-50%, -50%) scale(.5);
            }

            &::after {
                content: "";
                position: absolute;
                left: 50%;
                bottom: 22px;
                width: .5px;
                height: 120px;
                background: #DADADA;
                z-index: 1;
                transform: translate(-50%, 0) scale(.5);
                transform-origin: bottom;
            }

            .box-wallet-info-item {
                height: 100px;
                
                &.box-1 {
                    @include flexCenter;
                    flex-direction: column;
                }

                &.box-2 {
                    padding-left: 28px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                }

                h3 {
                    font-size: 14px;
                    line-height: 14px;
                    font-weight: 400;
                    color: #110f19;
                    margin-bottom: 10px;
                }
                .box-num {
                    padding-left: 21px;
                    background: url(../../../assets/img/common/img-logo-auto.png)
                        no-repeat left center / 17px auto;
                    font-size: 18px;
                    line-height: 18px;
                    font-weight: bold;
                    color: #110f19;

                    &.box-num-ksm {
                        background-image: url(../../../assets/img/common/img-logo-ksm.png);
                    }
                }

                p {
                    font-size: 11px;
                    line-height: 10px;
                    font-weight: 400;
                    color: #818189;
                    padding-left: 21px;
                    margin-top: 5px;
                }
            }
        }
    }

    .box-my-cat {
        margin-top: 55px;
        
        section {
            margin-top: 19px;
            display: flex;
            flex-wrap: wrap;
            padding-left: 38px;

            .box-cat-item {
                width: 83px;
                margin-bottom: 18px;

                &:not(:last-child) {
                    margin-right: 26px;
                }

                img {
                    display: block;
                    height: 125px;
                    margin-bottom: 12px;
                }

                .btn-sell {
                    height: 27px;
                    @include btn-common;
                    font-size: 12px;
                    line-height: 14px;
                }
            }
        }

        .section-empty {
            @include flexCenter;
            margin-top: 36px;
            padding-top: 98px;
            padding-left: 0;
            background: url(../../../assets/img/common/img-wallet-empty.png) no-repeat center top / 84px 79px;

            .btn-connect {
                @include btn-common;
                width: 140px;
                height: 35px;
                font-size: 14px;
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
        width: 320px;
        height: 530px;
        background: #110f19;
        border-radius: 12px;
        padding: 28px 20px 0;
        @include flex;
        flex-direction: column;
        position: relative;

        .btn-close {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 1;
            width: 21px;
            height: 20px;
            background: url(../../../assets/img/common/btn-close.png) no-repeat left bottom / 10px auto;
        }

        h1 {
            font-size: 23px;
            line-height: 18px;
            font-weight: normal;
            color: #FFFFFF;
            margin-bottom: 42px;
        }

        .box-sell-img {
            width: 137px;
            height: 206px;
        }

        h3 {
            line-height: 10px;
            font-size: 14px;
            font-family: Myriad Pro;
            font-weight: 400;
            color: #FFFFFF;
            margin-top: 10px;
        }

        .box-input {
            width: 100%;
            height: 43px;
            border: 2px solid #818189;
            border-radius: 12px;
            margin-top: 46px;
            box-sizing: border-box;
        }

        .box-cat-sell-input {
            height: 100%;
            background-color: transparent;
        }

        .btn-approve {
            @include btn-common;
            width: 100%;
            height: 43px;
            border-radius: 12px;
            font-size: 16px;
            line-height: 20px;
            margin-top: 13px;
        }

        p {
            font-size: 11px;
            line-height: 14px;
            font-family: Myriad Pro;
            font-weight: 400;
            color: #61616B;
            margin-top: 10px;
            letter-spacing: -.5px;
        }
    }
}
</style>