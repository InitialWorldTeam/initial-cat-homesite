<template>
    <div 
        class="container-random-box"
        :class="{
            'app': isApp
        }"
    >
        <canvas id="rootcanvas" width="600" height="600"></canvas>
        <div id="tags">
            <ul v-for="(item, index) in tagList" :key="index">
                <li>
                    <a
                        href="javascript:void(0);"
                        :style="{
                            color: '#fff'
                        }"
                    >
                        {{ item.name ? item.name : "" }}
                        <img
                            v-if="item.photo"
                            :src="item.photo"
                            :width="50"
                            :height="50"
                        />
                    </a>
                </li>
            </ul>
        </div>

        <!-- NFT Result -->
        <transition name="fade">
            <div
                class="box-nft-modal"
                v-if="isShowNftModal"
            >
                <main class="animate__animated animate__bounceIn">
                    <div class="box-nft-img">
                        <img :src="resNftImg" alt="">
                    </div>
                    <p @click="clearNftModal">Get it!</p>
                </main>
            </div>
        </transition>
    </div>
</template>

<script>
import common from "@/common/common";
import SaleApi from "@/config/salesmanApi";
import {
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
            resNftImg: null,
            nftType: 'CAT_SHOES_V0',
            isShowNftModal: false,
            tagList: [
                { photo: require("./img/01.png").default },
                { photo: require("./img/02.png").default },
                { photo: require("./img/03.png").default },
                { photo: require("./img/04.png").default },
                { photo: require("./img/05.png").default },
                { photo: require("./img/06.png").default },
                { photo: require("./img/07.png").default },
                { photo: require("./img/08.png").default },
                { photo: require("./img/09.png").default },
                { photo: require("./img/10.png").default },
                { photo: require("./img/11.png").default },
                { photo: require("./img/12.png").default },
                { photo: require("./img/13.png").default },
                { photo: require("./img/cat_art_hat.png").default },
                { photo: require("./img/cat_art_shoes.png").default },
                { photo: require("./img/cat_art.png").default },
                { photo: require("./img/cat_Avatar_shoes.png").default },
                { photo: require("./img/cat_Avatar.png").default },
                { photo: require("./img/cat_Avatarhat.png").default },
                { photo: require("./img/cat_gentleman_hat.png").default },
                { photo: require("./img/cat_gentleman_shoes.png").default },
                { photo: require("./img/cat_gentleman.png").default },
                { photo: require("./img/cat_Kungfu_hat.png").default },
                { photo: require("./img/cat_Kungfu_shoes.png").default },
                { photo: require("./img/cat_Kungfu.png").default },
                { photo: require("./img/cat_motion_hat.png").default },
                { photo: require("./img/cat_motion_shoes.png").default },
                { photo: require("./img/cat_motion.png").default },
                { photo: require("./img/cat_star_hat.png").default },
                { photo: require("./img/cat_star_shoes.png").default },
                { photo: require("./img/cat_star.png").default },
            ]
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        clearNftModal() {
            this.isShowNftModal = false;
            clearTimeout(this.timer);
            this.$emit('close');
        },
        reset() {
            this.$emit('close');
        },
        // 检查订单状态
        checkOrderStatus(orderId) {
            let config = {
                orderId
            };
            let url = SaleApi.checkBoxOrderStatus;

            return this.$http
                .post(url, config, "json")
                .then(async res => {
                    const {status, nftId} = res.data;
                    if (status === 'paid-confirmed' && nftId) {
                        clearTimeout(this.timer);

                        const NFT_DATA = await this.queryNftData([nftId]);
                        const { renderUrl } = NFT_DATA[0]?.preview;
                        this.resNftImg = renderUrl;
                        this.isShowNftModal = true;
                    } else {
                        this.timer = setTimeout(() => {
                            this.checkOrderStatus(orderId);
                        }, 5000)
                    }
                })
                .catch(err => {
                    console.log("checkBoxOrderStatus err:", err);
                    return false;
                });
        },
        // tranfer token 成功后调用
        confirmTransferSuccess(orderId) {
            let config = {
                address: this.curRootWallet.address,
                orderId
            };

            let url = SaleApi.markBoxOrderPaid;

            return this.$http
                .post(url, config, "json")
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log("markBoxOrderPaid err:", err);
                    return false;
                });
        },
        // 发起 Transfer Token
        async SendBatchTransfer(params) {
            const { orderId, toAddress, price } = params;

            let api = this.apiProvider;
            if (!api) {
                api = await this.initApi();
            }

            const remark = await api.tx.system.remark(
                `INITWD::1.0.0::MYSTERYBOX::${this.nftType}::${orderId}`
            );
            const transferNum = +price * Math.pow(10, 12);

            const tx = api.tx.utility.batchAll([
                remark,
                api.tx.balances.transfer(toAddress, transferNum)
            ]);

            const SENDER = this.curRootWallet.address;
            const injector = await web3FromAddress(SENDER);
            const ORDER_ID = orderId;

            let unsubscribe = await tx
                .signAndSend(
                    SENDER,
                    {
                        signer: injector.signer
                    },
                    async ({ events = [], status }) => {
                        console.log("status:", status);

                        if (status?.isFinalized || status?.isInBlock) {
                            unsubscribe();

                            events
                                .filter(
                                    ({ event: { section } }) =>
                                        section === "system"
                                )
                                .forEach(async ({ event: { data, method } }) => {
                                    if (method === "ExtrinsicFailed") {
                                        const [dispatchError] = data;
                                        if (dispatchError.isModule) {
                                            try {
                                                const mod =
                                                    dispatchError.asModule;
                                                const error = data.registry.findMetaError(
                                                    new Uint8Array([
                                                        mod.index.toNumber(),
                                                        mod.error.toNumber()
                                                    ])
                                                );
                                                console.log( "错误提示:", error.name ); //错误提示
                                                this.$toast.fail(error.name);
                                            } catch (error) {
                                                console.log(error);
                                                this.$toast.fail(error.message);
                                            }
                                        }
                                        this.reset();
                                    } else if (method === "ExtrinsicSuccess") {
                                        // console.log("成功");
                                        this.confirmTransferSuccess(orderId);
                                        this.checkOrderStatus(orderId);
                                    }
                                });
                        } else {
                            this.confirmTransferSuccess(orderId);
                            this.checkOrderStatus(orderId);
                        }
                    }
                )
                .catch(err => {
                    console.log(err);
                    this.$toast.fail(err.message);
                    this.reset();
                });
        },
        // 创建订单
        async createOrder(add) {
            let config = {
                address: add,
                nftType: this.nftType
            };
            let url = SaleApi.createBoxOrder;

            return this.$http
                .post(url, config, "json")
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log("err:", err);
                    return false;
                });
        },
        // 初始化Canvas动画
        startTagCanvas() {
            window.TagCanvas.Start("rootcanvas", "tags", {
                textColour: '#000',
                initial: [0.8, -0.3],
                // dragControl: 1,
                noSelect: true,
                lock: "xy",
                imageScale: 1,
                maxSpeed: 0.1,
                wheelZoom: false,
                txtScale: 1
            });
        }, 
        async initOrder() {
            const orderData = await this.createOrder(this.curRootWallet.address);
            if (!orderData) return;

            this.SendBatchTransfer(orderData.data);
        }
    },
    //请求数据
    created() {},
    mounted() {
        this.startTagCanvas();
        
        this.initOrder();
    }
};
</script>

<style scoped lang="scss">
.container-random-box {
    width: 600px;
    height: 600px;
    overflow: hidden;
    background-color: rgba($color: #000000, $alpha: 0.1);
    position: relative;
    box-sizing: border-box;

    &.app {
        width: 80vw;
        height: auto;

        .box-nft-modal {

            main {
                width: 50vw;
                
                .box-nft-img {
                    height: 50vw;
                }

                p {
                    font-size: 16px;
                    line-height: 40px;
                }
            }
        }
    }

    #rootcanvas {
        width: 100%;
        height: 100%;
        display: block;
    }

    #tags {
        width: 100%;
        height: 100%;
    }
}
.box-nft-modal {
    position: absolute;
    z-index: 10;
    background-color: rgba($color: #000000, $alpha: 0.8);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    @include flexCenter;

    main {
        width: 300px;
        border-radius: 12px;
        background-color: #fff;
        overflow: hidden;

        .box-nft-img {
            height: 300px;

            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        p {
            background: #fdd55a;
            font-size: 20px;
            font-weight: 600;
            color: #110f19;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
        }
    }
}
</style>
