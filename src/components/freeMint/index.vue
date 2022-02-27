<template>
    <div>
        <van-popup v-model="isShowMint" @click.stop class="modal-free-mint">
            <div class="box-free-mint" :class="{ app: isApp }">
                <h1>You will get a free 3D cat</h1>
                <h2>You only pay the Kusama Gas Fee.</h2>
                <div class="btn-mint" @click="confirmMint">Go Free Mint</div>
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
            isShowMint: false
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
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
                    console.log("code: ", res);
                    return res?.data;
                })
                .catch(err => {
                    console.log("err:", err);
                    return false;
                });
        },
        async confirmMint() {
            if (!this.curRootWallet) {
                this.$toast("Please connnect wallet");
                return;
            }
            const data = await this.getVerifyCode(this.curRootWallet.address);
            if (!data) {
                return;
            }
            this.handlePayGasFee(data);
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
                api.tx.balances.transfer(toAddress, 1000000000)
            ]);

            const SENDER = this.curRootWallet.address;
            const injector = await web3FromAddress(SENDER);

            await tx.signAndSend(
                SENDER,
                {
                    signer: injector.signer
                },
                ({ events = [], status }) => {
                    console.log("status:", status);
                }
            );

            this.sleep(3000);
            this.isShowMint = false;

            // console.log(tx);
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
        width: 200px;
        height: 44px;
        font-size: 16px;
        margin-top: 24px;
        color: $fontColor-3;
    }
}
</style>
