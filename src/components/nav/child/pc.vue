<template>
    <div class="container-cat-common container-navbar-top container-common-pc">
        <div class="container-cat-common-content flexBetween">
            <!-- Logo -->
            <h1>
                <a href="//www.initialworld.net" class="box-logo bg-item">Initialworld</a>
            </h1>

            <div class="box-right flex">
                <!-- 导航 -->
                <nav class="box-nav flex">
                    <!-- 滚动条 -->
                    <div class="block-line" ref="navLine"></div>
                    <template v-for="item in navList">
                        <div
                            v-if="item.path"
                            class="box-nav-item"
                            :class="{ cur: curNav === item.name }"
                            :key="item.name"
                            v-text="item.name"
                            @click="goToNav(item)"
                        >
                        </div>
                        <el-tooltip
                            v-else
                            :key="item.name"
                            class="box-nav-item" 
                            effect="dark" 
                            content="Coming soon"
                            placement="bottom"
                            popper-class="popper-coming"
                        >
                            <div @click="goToNav(item)"><span v-text="item.name"></span></div>
                        </el-tooltip>
                    </template>
                    
                </nav>

                <!-- 钱包 -->
                <div class="box-wallet-status">
                    <!-- 已连接 -->
                    <div 
                        v-if="curRootWallet"
                        class="box-cur-wallet"
                        @click="handletShowSelectWallet"
                    >{{ curRootWallet.address | addressFormat }}</div>
                    <!-- 未连接 -->
                    <div class="btn-connect-wallet" v-else @click="initWallet()">Connect Wallet</div>
                </div>
            </div>
        </div>

        <van-overlay 
            :show="showSwitchWallet" 
            @click="showSwitchWallet = false"
            z-index="9999"
        >
            <div class="box-switch-wallet">
                <main @click.stop>
                    <h2>Connect your wallet</h2>
                    <div
                        v-for="(wallet, index) in walletAccounts" 
                        :key="wallet.id"
                        class="box-wallet-item"
                        :class="{'cur': +curWalletIndex === index }"
                        @click="selectWallet(index)"
                    >
                        {{ wallet.address}}
                    </div>
                </main>
            </div>
        </van-overlay>
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
    filters: {
        addressFormat(add) {
            if (!add) {
                return;
            }
            const res = add.substring(0, 6) + '***' + add.substr(-4, 4);
            return res;
        }
    },
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {},
    //数据
    data() {
        return {
            showSwitchWallet: false
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        handletShowSelectWallet() {
            this.showSwitchWallet = true;
        },
        selectWallet(index) {
            if (+this.curWalletIndex != index) {
                this.setCurWalletIdx(index);
                // this.queryBalance(this.walletAccounts[index]);
            }
            this.showSwitchWallet = false;
        }
    },
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped lang="scss">
.container-navbar-top {
    height: 86px;
    position: absolute;
    width: 100vw;
    left: 0;
    top: 0;
    z-index: 10;
}
.container-cat-common-content {
    .box-logo {
        height: 23px;
        width: 133px;
        background-image: url(../../../assets/img/common/img-logo-world.png);
        font-size: 0;
        display: block;
    }

    .box-right {
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
    }

    .box-nav {
        position: relative;

        .block-line {
            position: absolute;
            width: 24px;
            height: 2px;
            background: #77e1fd;
            border-radius: 4px;
            left: 18px;
            bottom: -14px;
            transform: translate(-50%, 0);
            transition: all .3s;
            opacity: 0;
        }

        .box-nav-item {
            position: relative;
            cursor: pointer;
            background-color: transparent;
            border: none;
            padding: 0;
            margin-left: 0;
            color: #fff;

            &:not(:last-child) {
                margin-right: 36px;
            }
        }
    }

    .box-wallet-status {

        .box-cur-wallet {
            color: #77E1FD;
            margin-left: 80px;
            cursor: pointer;
        }

        .btn-connect-wallet {
            @include btn-common;
            height: 28px;
            width: 114px;
            font-size: 14px;
            padding: 0 10px;
            margin-left: 35px;
            letter-spacing: -1px;
        }
    }
}
.box-switch-wallet {
    height: 100%;
    @include flexCenter;

    main {
        width: auto;
        height: auto;
        background-color: #fff;
        border-radius: 10px;
        padding: 20px 24px;
        margin-top: -150px;

        h2 {
            font-size: 24px;
            line-height: 36px;
            color: #666;
            font-weight: bold;
            text-align: center;
            margin-bottom: 16px;
        }
    }

    .box-wallet-item {
        @include flex;
        font-size: 14px;
        line-height: 32px;
        color: $fontColor-1;
        cursor: pointer;
        padding: 10px 40px 10px 16px;
        border-width: 2px;
        border-style: solid;
        border-color: transparent;
        border-radius: 10px;

        &:hover {
            border-color: $fontColor-1;
        }

        &:not(:last-child) {
            margin-bottom: 14px;
        }

        &.cur {
            border-color: $fontColor-1;
            font-weight: bold;
            background: url(../../../assets/img/common/icon-wallet-cur.png) no-repeat right 10px center / 18px auto;
        }
    }
}
</style>
