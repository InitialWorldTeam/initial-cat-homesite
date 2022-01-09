<template>
    <div></div>
</template>

<script>
import { ApiPromise, WsProvider, HttpProvider } from "@polkadot/api";
import {
    isWeb3Injected,
    web3Accounts,
    web3Enable,
    web3FromAddress,
} from "@polkadot/extension-dapp";
import { stringToU8a, u8aToHex } from "@polkadot/util";
import { mapMutations, mapState, mapGetters } from "vuex";
import StatusApi from "@/config/statusApi";
import StorageApi from "@/config/storageApi";
import UTILS from '@/config/util';
import {
    Providers_Test, 
    Providers_Product, 
    Env_Debug,
    OwnWalletNameSpace,
    OwnWalletIdxNameSpace
} from '@/config/util/const';
import Decimal from 'decimal.js';

export default {
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {
        walletAccounts(val) {
            if (val.length) {
                UTILS.setJsonLocal(OwnWalletNameSpace, val);
                UTILS.setLocal(OwnWalletIdxNameSpace, this.curWalletIndex);
            }
        }
    },
    filters: {
        polkdotUnit(num) {
            return new Decimal(+num / Decimal.pow(10, 10)).toFixed(4);
        },
        ksmUnit(num) {
            return new Decimal(+num / Decimal.pow(10, 12)).toFixed(4);
        },
    },
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        ...mapState([
            "loading",
            "walletAccounts",
            "apiProvider",
            "myNftAssets",
            "loadingNftSta",
            "curWalletIndex",
            "isApp",
        ]),
        ...mapGetters([
            "curWallet"
        ]),
    },
    //数据
    data() {
        return {
            api: null
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        ...mapMutations([
            "setAccount", 
            "setLoading",
            "setCatAssetList",
            "setApiProvider",
            "setLoadingNftSta",
            "setCurWalletIdx",
            "setClientType",
        ]),
        checkIsLoadWallet() {
            const wallets = JSON.parse(UTILS.getLocal(OwnWalletNameSpace));
            const curIdx = UTILS.getLocal(OwnWalletIdxNameSpace);
            if (wallets) {
                this.setAccount(wallets);
                this.setCurWalletIdx(curIdx);
            }
        },
        // 判断是否App端
        checkIsApp() {
            let isApp = false;
            if (
                window.navigator.userAgent.match(
                    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                )
            ) {
                isApp = true; // 移动端
            }
            else {
                $('body').addClass('body-pc');
            }

            this.setClientType(isApp);
        },
        // 获取NFT真实地址
        async getNftUrl(ipfsUrl) {
            let config = {
                ipfs_url: ipfsUrl
            };
            let url = StorageApi.getNftUrl;

            return this.$http
                .post(url, config, "json")
                .then(res => {
                    // console.log('getURL:', res);
                    const { data } = res;
                    if (data) {
                        return data?.external_url;
                    }
                })
                .catch(err => {
                    console.log("err:", err);
                    return false;
                });
        },
        // 查询钱包所有NFT
        async getAllNfts() {
            let config = {
                address: this.curWallet.address
            };
            let url = StatusApi.getAllNfts;

            return this.$http
                .post(url, config, "json")
                .then(res => {
                    return res?.data;
                })
                .catch(err => {
                    console.log("err:", err);
                    return false;
                });
        },
        // 获取NFT对应数据
        async getNftById(id) {
            let config = {
                nftId: id
            };
            let url = StatusApi.getNftById;

            return this.$http
                .post(url, config, "json")
                .then(res => {
                    return res?.data;
                })
                .catch(err => {
                    console.log("err:", err);
                    return false;
                });
        },
        // 获取NFT对应的Base素材库
        async getBaseById(id) {
            let config = {
                baseId: id
            };
            let url = StatusApi.getBaseById;

            return this.$http
                .post(url, config, "json")
                .then(res => {
                    const { data } = res;
                    if (data) {
                        UTILS.setNftBase(id, data);
                    }
                    return data;
                })
                .catch(err => {
                    console.log("err:", err);
                    return false;
                });
        },
        // 遍历resource获取素材
        async getImageSourceByNftId(resource) {
            const Images = {};
            for (let item of resource) {
                if (item.base) {
                    let BaseRepository = UTILS.getNftBase(item.base);
                    if (!BaseRepository) {
                        BaseRepository = await this.getBaseById(item.base);
                    }

                    let imgData = [];
                    for (let itemChild of item.parts) {
                        let imgItem = BaseRepository.parts.filter((base, index, array) => {
                            return base.id === itemChild;
                        });
                        imgItem[0].url = '';
                        if (imgItem[0].src) {
                            /* this.getNftUrl(imgItem[0].src).then(res => {
                                imgItem[0].url = res;
                            }) */
                            imgItem[0].url = await this.getNftUrl(imgItem[0].src);
                        }
                        imgData.push(imgItem[0]);
                    }
                    Images[item.id] = imgData;
                }
                else {
                    Images[item.id] = await this.getNftUrl(item.src);
                }
            }
            return Images;
        },
        async queryNftData(nfts) {
            let data = [];
            for (let item of nfts) {
                const nftData = await this.getNftById(item);

                if (nftData) {
                    nftData.preview = await this.getImageSourceByNftId(nftData?.resources);
                    data.push(nftData);
                }
            }
            return data;
        },
        // 查询所有钱包的NFT资产
        async queryNftAsset() {
            this.setLoadingNftSta(0);
            const allNfts = await this.getAllNfts();
            // 更新NFT列表
            const NFT_DATA  = await this.queryNftData(allNfts);
            this.setCatAssetList(NFT_DATA);
            // 更新NFT加载状态
            const NFT_STA = NFT_DATA.length ? 1 : 2;
            this.setLoadingNftSta(NFT_STA);
        },
        // 查询钱包余额
        async queryBalance() {
            let api = this.apiProvider;
            if (!api) {
                api = await this.initApi();
            }
            this.walletAccounts.map(async (item, index, array) => {
                const { data: balance } = await api.query.system.account(
                    item.address
                );
                item.balance = JSON.parse(balance);
            });
            this.setAccount(this.walletAccounts);
            this.$nextTick(() => {
                this.queryNftAsset();
            })
        },
        // 校验当前路由是否为My NFTs
        checkRouterIsMyNfts () {
            const { name } = this.$route;
            if (name === 'MyNFTs') {
                this.queryBalance();
            }
        },
        // 校验当前路由是否为首页
        checkCurrentRoute () {
            const routeName = this.$route.name;
            if (routeName != 'Home') {
                this.$router.replace({
                    path: '/'
                })
            }
        },
        // sign and send transaction
        async transferToken(to, num, from) {
            // the address we use to use for signing, as injected
            const SENDER = from || this.curWallet.address;

            // finds an injector for an address
            const injector = await web3FromAddress(SENDER);
            const amount = +num * Decimal.pow(10, 12);

            this.apiProvider.tx.balances
                .transfer(to, amount)
                .signAndSend(SENDER, {
                    signer: injector.signer 
                }, (status) => { 
                    console.log('====Status', status);
                });
        },
        // 校验浏览器环境，初始化Api
        async initApi() {
            const extensions = await web3Enable("polkadot-js/apps");
            if (extensions.length === 0) {
                // no extension installed, or the user did not accept the authorization
                // in this case we should inform the use and give a link to the extension
                return;
            }

            this.setLoading(true);

            // Construct
            let apiProvider;
            if (Env_Debug) {
                apiProvider = new HttpProvider(Providers_Test.http);
                // apiProvider = new WsProvider(Providers_Test.ws);
            } else {
                apiProvider = new WsProvider(Providers_Product.kusama.Parity);
            }
            
            const api = await ApiPromise.create({
                provider: apiProvider
            });
            this.setApiProvider(api);
            this.$nextTick(() => {
                this.setLoading(false);
            });
            return api;
        },
        // 初始化钱包
        async initWallet() {
            await this.initApi();

            // 获取钱包所有帐户信息
            let allAccounts = await web3Accounts({
                ss58Format: 2 // 默认42-Substrate, 0-polkdot, 2-Kusama
            });
            this.setAccount(allAccounts);
            this.$nextTick(() => {
                this.checkRouterIsMyNfts();
            });
        }
    },
    //请求数据
    created() {},
    async mounted() {}
};
</script>

<style scoped></style>
