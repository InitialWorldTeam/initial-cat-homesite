<template>
    <div>
    
    </div>
</template>

<script>
import common from "@/common/common";
import SaleApi from "@/config/salesmanApi";
import { web3FromAddress } from "@polkadot/extension-dapp";
import { Nft_Type_List } from "@/config/util/const";

export default {
    mixins: [common],
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        swapItemTitle() {
            const TITLE = {
                'MBK': 'Mystery Box Key',
                'SBK': 'Speed Boat Key',
            }

            return TITLE[this.curSwapData.swapType];
        },
        nftType() {
            return this.curSwapData.name;
        },
        nftStyle() {
            let stylePc = {
                width: "210px",
                height: "210px",
                bgColor: "0xAFBFFF",
                'border-radius': '0'
            };
            let styleApp = {
                width: "50vw",
                height: "50vw",
                bgColor: "0xAFBFFF",
                'border-radius': '0'
            };
            return this.isApp ? styleApp : stylePc;
        },
    },
    //数据
    data(){
      return {
          isShowNftModal: false,
          isShowConfirmPop: false,
          confirmType: '2',
          useKeyList: [],
          cueKeyInfo: null,
          nftData: null
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        clearNftModal() {
            this.nftData = null;
            this.isShowNftModal = false;
        },
        reset() {
            this.setLoading(false);
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
                    const { status, nftId } = res.data;
                    if (status === "paid-confirmed" && nftId) {
                        clearTimeout(this.timer);

                        const NFT_DATA = await this.queryNftData([nftId]);
                        this.nftData = NFT_DATA[0];
                        this.isShowNftModal = true;
                        this.getUserSwapKeyList();
                        this.reset();
                    } else {
                        this.timer = setTimeout(() => {
                            this.checkOrderStatus(orderId);
                        }, 5000);
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
            this.setLoading(true);

            const { orderId, toAddress, price } = params;

            let api = this.apiProvider;
            if (!api) {
                api = await this.initApi();
            }

            let tx;
            const TITLE = 'MYSTERYBOX';

            const remarkReason = await api.tx.system.remark(
                `INITWD::1.0.0::${TITLE}_SWAPKEY::${this.nftType}::${orderId}`
            );
            const remarkBurn = await api.tx.system.remark(
                `RMRK::BURN::2.0.0::${this.cueKeyInfo}`
            );

            tx = api.tx.utility.batchAll([
                remarkReason,
                remarkBurn
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
                                .forEach(
                                    async ({ event: { data, method } }) => {
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
                                                    console.log(
                                                        "错误提示:",
                                                        error.name
                                                    ); //错误提示
                                                    this.$toast.fail(
                                                        error.name
                                                    );
                                                } catch (error) {
                                                    console.log(error);
                                                    this.$toast.fail(
                                                        error.message
                                                    );
                                                }
                                            }
                                            this.reset();
                                        } else if (
                                            method === "ExtrinsicSuccess"
                                        ) {
                                            // console.log("成功");
                                            this.confirmTransferSuccess(
                                                orderId
                                            );
                                            this.checkOrderStatus(orderId);
                                        }
                                    }
                                );
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
            this.setLoading(true);

            let config = {
                address: add,
                nftType: this.nftType
            };
            let url = SaleApi.createBoxOrder;

            return this.$http
                .post(url, config, "json")
                .then(res => {
                    this.setLoading(false);
                    return res;
                })
                .catch(err => {
                    this.setLoading(false);
                    console.log("err:", err);
                    return false;
                });
        },
        async initOrder() {
            const orderData = await this.createOrder(
                this.curRootWallet.address
            );
            if (!orderData) {
                return;
            };

            this.SendBatchTransfer(orderData.data);
        },
        handelCancelMint() {
            this.cueKeyInfo = null;
            this.isShowConfirmPop = false;
        },
        async handleConfirmMint() {
            this.setMintType(2);
            this.isShowConfirmPop = false;

            this.initOrder();
        },
        handleStartUse(item) {
            this.cueKeyInfo = item;
            this.isShowConfirmPop = true;
        },
        // get Swap List
        getUserSwapKeyList(add) {
            if (!this.curSwapData) {
                return;
            }

            let config = {
                address: add || this.curRootWallet.address
            };
            let url = SaleApi.getSwapKeyList;

            return this.$http
                .post(url, config)
                .then(res => {
                    if (res.data) {
                        this.useKeyList = res.data[this.curSwapData.swapType];
                        return this.useKeyList;
                    }
                    return false;
                })
                .catch(err => {
                    console.log("err:", err);
                    return false;
                });
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    //请求数据
    created() {},
    mounted() {
        this.getUserSwapKeyList();
    },
}
</script>

<style scoped lang='scss'>

</style>