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
    computed: {},
    //数据
    data(){
      return {
          useKeyList: []
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
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
                .post(url, config, "json")
                .then(res => {
                    console.log(res);
                    if (res.data) {
                        this.keyList = res.data[this.curSwapData.swapType];
                        console.log(this.keyList);
                        return this.keyList;
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