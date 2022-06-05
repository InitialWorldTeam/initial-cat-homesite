<template>
    <div>
    
    </div>
</template>

<script>
import common from "@/common/common";

export default {
    mixins: [common],
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {
        curRootWallet(newVal) {
            if (newVal) {
                this.$router.push({
                    path: `/myNft/${newVal.address}`
                });
            }
        },
        urlAddress(newVal) {
            if (newVal) {
                this.queryBalance(newVal);
            }
        }
    },
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        urlAddress() {
            return this.$route.params?.id;
        },
    },
    //数据
    data(){
      return {
          showDetail: false,
          curNftData: null,
          typeList: [
              { type: 1, name: 'All' },
              { type: 2, name: 'InitialCat' },
              { type: 3, name: 'SpeedBoat' },
              { type: 4, name: 'Head' },
              { type: 5, name: 'Clothing' },
              { type: 6, name: 'Shoe' },
              { type: 7, name: 'Hand' },
              { type: 8, name: 'POAP' },
          ],
          curType: 'All',
          nftList: [],
          isHideSinglePage: true, // 当只有一页时是否隐藏分页
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        handlePageChange(page) {
            this.setCurPage(page);
            this.queryNftAsset(this.curQueryWallet.address);
        },
        onCopy: function(e) {
            const text = 'Copied your address.'
            this.$toast(text);
        },
        selectType(item) {
            this.curType = item.name;
        }
    },
    //请求数据
    async created() {
        if (this.urlAddress) {
            this.queryBalance(this.urlAddress);
        }
    },
    async mounted() {},
    beforeDestroy() {
        this.setCurPageNft([]);
        this.setAllNftList([]);
    }
}
</script>

<style scoped lang='scss'>

</style>