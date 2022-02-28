<template>
    <div>
        <van-popup v-model="isShowMint" @click.stop class="modal-free-mint" @closed='handleClosePop'>
            <div class="box-free-mint" :class="{ app: isApp }">
                <h1>You will get a free 3D cat</h1>
                <h2>You only pay the Kusama Gas Fee.</h2>
                <div 
                    class="btn-mint"
                    :class="{
                        'disable': !mintAble
                    }"
                    @click="confirmMint"
                >
                    <template v-if="mintAble">
                        <i class="icon-mint"></i><span>To Mint</span>
                    </template>

                    <template v-else>
                        <van-button loading/><span>Minting</span>
                    </template>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import common from "@/common/common";
import SaleApi from "@/config/salesmanApi";
import {
    isWeb3Injected,
    web3Accounts,
    web3Enable,
    web3FromAddress
} from "@polkadot/extension-dapp";

export default {
    mixins: [common],
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
        return {
            isShowMint: false, // 是否展示弹层
            mintAble: true, // 是否可点击Mint
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        async resetMintStatus() {
            this.mintAble = true;
        },
        handleClosePop() {
            this.$toast.fail({
                message: 'You cancelled the transaction',
                duration: 3 * 1000
            });
        },
        handleShowMint() {
            this.isShowMint = true;
        },
        async getVerifyCode(add) {
            let config = {
                address: add
            };
            let url = SaleApi.getVerifyCode;

            return this.$http
                .post(url, config, "json")
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log("err:", err);
                    return err;
                });
        },
        async confirmMint() {
            // 未连接钱包时提示
            if (!this.curRootWallet) {
                this.$toast("Please connnect wallet");
                return;
            }
            // 正在 Mint 时不可点击
            if (!this.mintAble) {
                return;
            }

            this.mintAble = false;
            // 请求接口报错时不可点击
            const CODE_DATA = await this.getVerifyCode(this.curRootWallet.address);
            if (CODE_DATA.code !== '0000') {
                this.$toast.fail( CODE_DATA?.msg || 'Something error, please try again');
                this.mintAble = true;
                return;
            }

            this.handlePayGasFee(CODE_DATA?.data);
        },
        async handlePayGasFee(params) {
            let type = "CAT";
            const { verifyCode, toAddress } = params;

            let api = this.apiProvider;
            if (!api) {
                api = await this.initApi();
            }

            const remark = await api.tx.system.remark(
                `INITWD::FREEMINT::${type}::${verifyCode}`
            );

            const tx = api.tx.utility.batchAll([
                remark,
                api.tx.balances.transfer(toAddress, Math.pow(10, 9))
            ]);

            const SENDER = this.curRootWallet.address;
            const injector = await web3FromAddress(SENDER);

            await tx.signAndSend(
                SENDER,
                {
                    signer: injector.signer
                },
                async ({ events = [], status }) => {
                    console.log("status:", status);
                    await this.sleep();
                    this.resetMintStatus();
                }
            ).catch(err => {
                console.log(err);
                this.$toast.fail(err.message);
                this.resetMintStatus();
            })

            
        }
    },
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped lang="scss">
.modal-free-mint {
    border-radius: 10px;
}
.box-free-mint {
    width: 500px;
    // height: 300px;
    @include flex;
    flex-direction: column;
    color: $fontColor-1;
    padding: 36px 24px;

    &.app {
        width: 85vw;
        padding: 20px;

        h1 {
            font-size: 18px;
            line-height: 24px;
            font-weight: bold;
        }

        h2 {
            font-size: 12px;
            line-height: 16px;
        }

        .btn-mint {
            font-size: 14px;
            width: 150px;
            height: 35px;
        }
    }

    h1 {
        font-size: 32px;
        line-height: 40px;
    }

    h2 {
        font-size: 16px;
        line-height: 24px;
        margin-top: 18px;
        opacity: 0.5;
    }

    .btn-mint {
        @include btn-common;
        width: 150px;
        height: 44px;
        font-size: 16px;
        margin-top: 24px;
        color: $fontColor-3;

        &.disable {
            background-color: rgba($color: #ccc, $alpha: 0.9);
            color: #999;
            
            .van-button--loading {
                border: none;
                background-color: transparent;
                padding: 0 8px;
            }

        }

        .icon-mint {
            width: 16px;
            height: 16px;
            background: url(./img/bg-mint.png) no-repeat center / 100% auto;
            margin-right: 10px;
            animation: mint .5s linear infinite alternate;
        }
    }
}

@keyframes mint {
    from {
        transform: rotate(-25deg);
    }
    to {
        transform: rotate(0deg);
    }
}
</style>
