<template>
    <div></div>
</template>

<script>
import common from "@/common/common";
import SaleApi from "@/config/salesmanApi";
import {
    web3FromAddress
} from "@polkadot/extension-dapp";
import { Min_Ksm_Balance, Nft_Type_List } from "@/config/util/const";

export default {
    mixins: [common],
    //部件
    components: {},
    //静态
    props: {
        price: {
            type: String,
            defautl: '0'
        },
        type: {
            type: String,
            defautl: '1'
        }
    },
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        nftType() {
            return this.curSwapData.name;
        },
    },
    //数据
    data() {
        return {
            nftData: null,
            checkNum: 0
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        showNftResult(data) {
            this.$emit('showNftResult', data);
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

                        this.$emit('showNftResult', this.nftData);

                        this.reset();
                    } else {
                        this.checkNum++;
                        
                        if (this.checkNum >= 30) {
                            this.checkNum = 0;
                            clearTimeout(this.timer);
                            this.reset();
                            this.$toast('Please wait 2~3 minutes');
                            return;
                        }
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
            const { orderId, toAddress, price } = params;

            let api = this.apiProvider;
            if (!api) {
                api = await this.initApi();
            }

            this.setLoading(true);

            let tx;
            const TITLE = this.curSwapData.title;

            console.log('TITLE: ', TITLE);

            const remark = await api.tx.system.remark(
                `INITWD::1.0.0::${TITLE}::${this.nftType}::${orderId}`
            );
            const transferNum = +price * Math.pow(10, 12);

            tx = api.tx.utility.batchAll([
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
        handleCancel() {
            this.$emit("cancel");
        },
        handleConfirm() {
            this.$emit("confirm");

            if (this.mintType === 1) {
                this.confirmMint();
            }

            if (this.mintType === 2) {
                this.initOrder();
            }
        },
        resetMintStatus() {
            this.setLoading(false);
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
            if (this.loading) {
                return;
            }

            await this.queryBalance();

            // 钱包余额过低时提示
            if (this.walletBalance < +Min_Ksm_Balance) {
                this.$toast.fail({
                    message: " please keep balance more than 0.0015KSM",
                    duration: 3000
                });
                return;
            }

            this.setLoading(true);

            // 请求接口报错时不可点击
            const CODE_DATA = await this.getVerifyCode(
                this.curRootWallet.address
            );
            if (CODE_DATA.code !== "0000") {
                this.$toast.fail(
                    CODE_DATA?.msg || "Something error, please try again"
                );
                this.setLoading(false);
                return;
            }

            this.handlePayGasFee(CODE_DATA?.data);
        },
        // tranfer token 成功后调用，用户主动确认已付款
        handeConfirmTransferSuccess(params) {
            const { verifyCode } = params;
            let config = {
                address: this.curRootWallet.address,
                verifyCode
            };
            let url = SaleApi.confirmTransferSuccess;

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
        // 发起 Transfer Token
        async handlePayGasFee(params) {
            let type = Nft_Type_List.base.name;
            const { verifyCode, toAddress } = params;

            let api = this.apiProvider;
            if (!api) {
                api = await this.initApi();
            }

            const TITLE = this.curSwapData.title;
            console.log('TITLE:', TITLE);
            const remark = await api.tx.system.remark(
                `INITWD::1.0.0::${TITLE}::${type}::${verifyCode}`
            );

            const tx = api.tx.utility.batchAll([
                remark,
                api.tx.balances.transfer(toAddress, Math.pow(10, 9))
            ]);

            const SENDER = this.curRootWallet.address;
            const injector = await web3FromAddress(SENDER);

            let unsubscribe = await tx
                .signAndSend(
                    SENDER,
                    {
                        signer: injector.signer
                    },
                    async ({ events = [], status }) => {
                        console.log("status:", status);

                        return;

                        if (status.isFinalized || status.isInBlock) {
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
                                        } else if (
                                            method === "ExtrinsicSuccess"
                                        ) {
                                            // console.log("成功");
                                            this.handeConfirmTransferSuccess(
                                                params
                                            );
                                            await this.sleep();
                                            this.resetMintStatus();
                                            this.$toast.success(
                                                "Mint Success, Please wait 2~3 minutes"
                                            );
                                        }
                                    }
                                );
                        }
                    }
                )
                .catch(err => {
                    console.log(err);
                    this.$toast.fail({
                        message: err.message,
                        duration: 3000
                    });
                    this.resetMintStatus();
                });
        },
        async queryBalance() {
            let api = this.apiProvider;
            if (!api) {
                api = await this.initApi();
                console.log('api', api);
            }
            // 查询余额
            const add = this.curRootWallet.address;
            const {
                data: balance
            } = await api.query.system.account(add);
            const { free } = JSON.parse(balance);
            this.walletBalance = free;
        }
    },
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped lang="scss"></style>
