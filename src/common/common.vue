<template>
    <div></div>
</template>

<script>
import { ApiPromise, WsProvider, HttpProvider } from "@polkadot/api";
import {
    isWeb3Injected,
    web3Accounts,
    web3Enable,
    web3FromAddress
} from "@polkadot/extension-dapp";
import { stringToU8a, u8aToHex } from "@polkadot/util";
import { mapMutations, mapState, mapGetters } from "vuex";
import StatusApi from "@/config/statusApi";
import StorageApi from "@/config/storageApi";
import UTILS from "@/config/util";
import {
    Providers_Test,
    Providers_Product,
    Env_Debug,
    OwnWalletNameSpace,
    OwnWalletIdxNameSpace,
    IpfsSwitchDomain
} from "@/config/util/const";
import Decimal from "decimal.js";
import axios from 'axios';

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
        }
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
            "navList",
            "curNav",
            "curQueryWallet",
        ]),
        ...mapGetters(["curRootWallet"]),
        // 标记当前路由页面
        curNav() {
            return this.$route.name;
        }
    },
    //数据
    data() {
        return {};
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
            "setQueryWallet"
        ]),
        sleep(time = 2000) {
            return new Promise((reslove, reject) => {
                setTimeout(() => {
                    reslove();
                }, time);
            })
        },
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
            } else {
                $("body").addClass("body-pc");
            }

            this.setClientType(isApp);
        },
        replaceIpfsUrl(ipfsUrl) {
            return ipfsUrl.replace("ipfs://", IpfsSwitchDomain);
        },
        // 获取NFT真实地址
        async getNftUrl(ipfsUrl, type = "replace") {
            // type 获取Url的方式. replace 直接替换为可以访问地址，post 请求服务器获取对应Url
            if (type === "replace") {
                return new Promise((resolve, reject) => {
                    ipfsUrl = this.replaceIpfsUrl(ipfsUrl);
                    resolve(ipfsUrl);
                });
            } else {
                let config = {
                    ipfs_url: ipfsUrl
                };
                let url = StorageApi.getNftUrl;

                return this.$http
                    .post(url, config, "json")
                    .then(res => {
                        const { data } = res;
                        if (data) {
                            return data?.external_url;
                        }
                    })
                    .catch(err => {
                        console.log("err:", err);
                        return false;
                    });
            }
        },
        // 查询钱包所有NFT
        async getAllNfts(add) {
            let config = {
                address: add
            };
            let url = StatusApi.getAllNfts;

            return this.$http
                .post(url, config, "json")
                .then(res => {
                    console.log('all Nft: ', res);
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
        async getImageSourceByNftId(nft) {
            let Images = null;
            const { resources, priority } = nft;

            const META_TYPE = {
                threeD: ['gltf', 'fbx']
            }
            // 根据优先级ID 查询并输入资源
            let queryResource = async priorityId => {
                let res = false;
                // 在 resources 中未找到 priorityId 对应资源，则返回false。继续查询下一个 priorityId
                for (let item of resources) {
                    if (item.id === priorityId) {
                        if (item.metadata) {
                            item.metaType = await getMetaType(item);
                            const isThree = META_TYPE.threeD.some((child) => {
                                if (item.metaType.includes(child)) {
                                    item.metaType = child;
                                    return true;
                                }
                                return false;
                            })

                            if (isThree) {
                                res = formatAssetObj(3, item);
                            } else {
                                res = formatAssetObj(2, item);
                            }
                        } else {
                            res = formatAssetObj(2, item);
                        }
                        break;
                    }
                }
                return res;
            };

            let formatAssetObj = async (type, item) => {
                return {
                    type: type === 3 ? item.metaType : 'images',
                    renderUrl: type === 3 ? this.replaceIpfsUrl(item.src) : await getAssets(item),
                    ...item
                }
            }

            // 根据metadata获取资源类型
            let getMetaType = async (item) => {
                let url = this.replaceIpfsUrl(item.metadata);
                console.log(url);
                return axios.get(url)
                    .then(res => {
                        return res?.data?.mimeType;
                    })
            }

            // 获取2d静态资源
            let getAssets = async item => {
                let res;
                if (item.base) {
                    let BaseRepository = UTILS.getNftBase(item.base);
                    if (!BaseRepository) {
                        BaseRepository = await this.getBaseById(item.base);
                    }

                    let imgData = [];
                    for (let partItem of item.parts) {
                        let imgItem = BaseRepository.parts.filter(
                            (base, index, array) => {
                                return base.id === partItem;
                            }
                        );
                        imgItem[0].url = "";
                        // 目前缺少 type = slot 类型的装备资源获取，Date: 20220221
                        if (imgItem[0].src) {
                            imgItem[0].url = await this.getNftUrl(
                                imgItem[0].src
                            );
                        }
                        imgData.push(imgItem[0]);
                    }
                    res = imgData;
                } else {
                    res = await this.getNftUrl(item.src);
                }

                return res;
            };

            let PriorityIdx = 0; // 查询当前优先级成员索引
            return new Promise((resolve, reject) => {
                let mapPriority = async () => {
                    let curPrioId = priority[PriorityIdx];
                    let src = await queryResource(curPrioId);
                    if (!src) {
                        if (PriorityIdx < priority.length) {
                            PriorityIdx++;
                            mapPriority();
                            return;
                        }

                        // 如果 priority 全部遍历后仍未在 resources 找到对应资源，返回 false
                        resolve(false);
                    }

                    Images = src;
                    resolve(Images);
                };
                mapPriority();
            });
        },
        async queryNftData(nfts) {
            let data = [];
            for (let item of nfts) {
                const nftData = await this.getNftById(item);

                if (nftData) {
                    nftData.preview = await this.getImageSourceByNftId(nftData);
                    data.push(nftData);
                }
            }
            return data;
        },
        // 查询所有钱包的NFT资产
        async queryNftAsset(add) {
            this.setLoadingNftSta(0);
            const ALL_NFTS = await this.getAllNfts(add);

            // 更新NFT列表
            const NFT_DATA = await this.queryNftData(ALL_NFTS);
            this.setCatAssetList(NFT_DATA);
            console.log('NFT_DATA', NFT_DATA);

            this.$nextTick(() => {
                // 更新NFT加载状态
                const NFT_STA = NFT_DATA.length ? 1 : 2;
                this.setLoadingNftSta(NFT_STA);
            })
        },
        // 查询钱包余额
        async queryBalance(add) {
            let api = this.apiProvider;
            if (!api) {
                api = await this.initApi();
            }

            const { data: balance } = await api.query.system.account(add);

            let wallet = {
                address: add,
                balance: JSON.parse(balance)
            };
            // 设置查询钱包为当前钱包
            this.setQueryWallet(wallet);

            // 查询浏览器环境所有钱包余额
            /* this.walletAccounts.map(async (item, index, array) => {
                const { data: balance } = await api.query.system.account(
                    item.address
                );
                item.balance = JSON.parse(balance);
            });
            this.setAccount(this.walletAccounts); */
            this.$nextTick(() => {
                this.queryNftAsset(add);
            });
        },
        // 校验当前路由是否为My NFTs
        checkRouterIsMyNfts() {
            const { name, params } = this.$route;
            if (name === "My NFTs") {
                this.queryBalance(params.id);
            }
        },
        // 校验当前路由是否为首页
        checkCurrentRoute() {
            const routeName = this.$route.name;
            if (routeName != "Home") {
                this.$router.replace({
                    path: "/"
                });
            }
        },
        // sign and send transaction
        async transferToken(to, num, from) {
            // the address we use to use for signing, as injected
            const SENDER = from || this.curRootWallet.address;

            // finds an injector for an address
            const injector = await web3FromAddress(SENDER);
            const amount = +num * Decimal.pow(10, 12);

            this.apiProvider.tx.balances.transfer(to, amount).signAndSend(
                SENDER,
                {
                    signer: injector.signer
                },
                status => {
                    console.log("transfer Status: ", status);
                    this.queryBalance(SENDER);
                }
            );
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
        async initWallet(cb) {
            await this.initApi();

            // 获取钱包所有帐户信息
            let allAccounts = await web3Accounts({
                ss58Format: 2 // 默认42-Substrate, 0-polkdot, 2-Kusama
            });
            this.setAccount(allAccounts);
            this.$nextTick(() => {
                cb && cb();
            });
        }
    },
    //请求数据
    created() {},
    async mounted() {}
};
</script>

<style scoped></style>
