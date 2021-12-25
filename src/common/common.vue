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
import UTILS from '@/config/util';
import {Providers_Test, Providers_Product, Env_Debug} from '@/config/util/const';

export default {
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    filters: {
        polkdotUnit(num) {
            return +num / Math.pow(10, 10);
        }
    },
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        ...mapState([
            "loading",
            "walletAccounts"
        ]),
        ...mapGetters([
            "curWallet"
        ])
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
            "setCatAssetList"
        ]),
        // 获取NFT真实地址
        async getNftUrl(ipfsUrl) {
            let config = {
                ipfs_url: ipfsUrl
            };
            let url = StorageApi.getNftUrl;

            return this.$http
                .post(url, config, "json")
                .then(res => {
                    console.log('getURL:', res);
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
            const allNfts = await this.getAllNfts();
            const NFT_DATA  = await this.queryNftData(allNfts);
            this.setCatAssetList(NFT_DATA);
            this.setLoading(false);
        },
        // 查询钱包余额
        queryBalance(wallets) {
            wallets.map(async (item, index, array) => {
                const { data: balance } = await this.api.query.system.account(
                    item.address
                );
                item.balance = JSON.parse(balance);
            });
            this.setAccount(wallets);
            this.$nextTick(() => {
                this.queryNftAsset();
            })
        },
        // 初始化钱包
        async initWallet() {
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
            
            const api = (this.api = await ApiPromise.create({
                provider: apiProvider
            }));

            // Retrieve the last timestamp
            const now = await api.query.timestamp.now();

            // 获取钱包所有帐户信息
            let allAccounts = await web3Accounts({
                ss58Format: 2 // 默认42-Substrate, 0-polkdot, 2-Kusama
            });
            this.queryBalance(allAccounts);
            console.log(allAccounts);
        }
    },
    //请求数据
    created() {},
    async mounted() {}
};
</script>

<style scoped></style>
