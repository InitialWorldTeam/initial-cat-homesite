<template>
    <div>
    
    </div>
</template>

<script>
import common from "@/common/common";
import { getCountTime } from "@/config/util";
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
          nftData: null,
          price: 0,
          amount: 0,
          isShowConfirmPop: false,
          startDate: '1652615862000',
          bannerImg: require('../img/img-banner.png').default,
          timeData: [
              { value: '00', unit: 'Days' },
              { value: '20', unit: 'Hours' },
              { value: '12', unit: 'Mins' },
              { value: '15', unit: 'Secs' }
          ],
          seriesList: [
              {
                  name: 'Avatarhat',
                  amount: '∞',
                  probability: '8.33%',
                  img: require('../img/img-series-demo.png')
              },
              {
                  name: 'Avatarhat',
                  amount: '∞',
                  probability: '8.33%',
                  img: require('../img/img-series-demo.png')
              },
              {
                  name: 'Avatarhat',
                  amount: '∞',
                  probability: '8.33%',
                  img: require('../img/img-series-demo.png')
              },
              {
                  name: 'Avatarhat',
                  amount: '∞',
                  probability: '8.33%',
                  img: require('../img/img-series-demo.png')
              },
              {
                  name: 'Avatarhat',
                  amount: '∞',
                  probability: '8.33%',
                  img: require('../img/img-series-demo.png')
              },
              {
                  name: 'Avatarhat',
                  amount: '∞',
                  probability: '8.33%',
                  img: require('../img/img-series-demo.png')
              },
              {
                  name: 'Avatarhat',
                  amount: '∞',
                  probability: '8.33%',
                  img: require('../img/img-series-demo.png')
              },
              {
                  name: 'Avatarhat',
                  amount: '∞',
                  probability: '8.33%',
                  img: require('../img/img-series-demo.png')
              },
              {
                  name: 'Avatarhat',
                  amount: '∞',
                  probability: '8.33%',
                  img: require('../img/img-series-demo.png')
              },
          ]
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        clearNftModal() {
            this.nftData = null;
            this.isShowNftModal = false;
        },
        handleShowNftResult(nftData) {
            this.isShowNftModal = true;
            this.nftData = nftData;
        },
        handleShowKeyList() {
            this.setSwapData(Nft_Type_List.equip);

            this.$router.push({
                path: '/usekey'
            })
        },
        handleShowMint() {
            this.isShowConfirmPop = true;
        },
        handleConfirmMint() {
            this.setSwapData(Nft_Type_List.equip);
            this.setMintType(2);
            this.isShowConfirmPop = false;
        },
        handelCancelMint() {
            this.isShowConfirmPop = false;
        },
    },
    //请求数据
    created() {},
    async mounted() {
        this.getSalePrice('V0_CAT_EQUIP').then(res => {
             this.price = res?.price || 0;
        })
        this.getSaleReport('V0_CAT_EQUIP').then(res => {
            this.amount = res?.countAvailable || 0;
        })
    },
}
</script>

<style scoped lang='scss'>

</style>