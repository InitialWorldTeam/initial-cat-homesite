<template>
    <div>
    
    </div>
</template>

<script>
import common from "@/common/common";
import QRCode from 'qrcode';

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
          showCode: false,
          codeUrl: null,
          codeAddress: null
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        handleBackToWallet() {
            this.showCode = false
        },
        handleShowCode(item) {
            QRCode.toDataURL(item.address)
                .then(url => {
                    console.log(url);
                    this.codeUrl = url;
                    this.codeAddress = item.address;
                    this.showCode = true;
                })
                .catch(err => {
                    console.error(err)
                })
        },
        onCopy: function(e) {
            const text = 'Copied your address.'
            this.$toast(text);
        },
        selectWallet(index) {
            if (+this.curWalletIndex != index) {
                this.setCurWalletIdx(index);
            }
            this.$router.push({
                path: '/'
            })
        }
    },
    //请求数据
    async created() {
        await this.getPolkadotWalletList();
    },
    mounted() {
        console.log(this.walletAccounts);
    },
}
</script>

<style scoped lang='scss'>

</style>