<template>
    <div>
    
    </div>
</template>

<script>
import { ApiPromise, WsProvider } from "@polkadot/api";
import {
    isWeb3Injected,
    web3Accounts,
    web3Enable,
    web3FromAddress
} from "@polkadot/extension-dapp";
import { stringToU8a, u8aToHex } from "@polkadot/util";
import { mapMutations } from 'vuex'

export default {
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {},
    //数据
    data(){
      return {
          api: null
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        ...mapMutations([
            'setAccount'
        ]),
        queryBalance(wallets) {
            wallets.map(async(item, index, array) => {
                const { data: balance } = await this.api.query.system.account(item.address);
                item.balance = JSON.parse(balance);
            })
            this.setAccount(wallets);
        }
    },
    //请求数据
    created() {
        
    },
    async mounted() {
        const extensions = await web3Enable("polkadot-js/apps");
        console.log("extensions", extensions);

        if (extensions.length === 0) {
            // no extension installed, or the user did not accept the authorization
            // in this case we should inform the use and give a link to the extension
            return;
        }

        // Construct
        const wsProvider = new WsProvider("wss://rpc.polkadot.io");
        // const wsProvider = new WsProvider("ws://104.198.42.65:9944");
        const api = this.api = await ApiPromise.create({ provider: wsProvider });

        // Retrieve the last timestamp
        const now = await api.query.timestamp.now();

        // 获取钱包所有帐户信息
        let allAccounts = await web3Accounts({
            ss58Format: 0 // 默认42-Substrate, 0-polkdot, 2-Kusama
        });
        this.queryBalance(allAccounts);
        console.log('所有钱包：', allAccounts);
    },
}
</script>

<style scoped>

</style>
