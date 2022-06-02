<template>
    <div>
    
    </div>
</template>

<script>
import common from "@/common/common";
import { getCountTime } from "@/config/util";

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
        handleShowMint() {
            this.isShowConfirmPop = true;
        },
        handleConfirmMint() {
            console.log('confirm');
            this.isShowConfirmPop = false;
        },
        handelCancelMint() {
            this.isShowConfirmPop = false;
        },
        stratCountDown() {
            let timer = setInterval(() => {
                let res = getCountTime(this.startDate);
                if (!res) {
                    clearInterval(res);
                    return;
                }
                this.timeData = res;
            }, 1000)
        }
    },
    //请求数据
    created() {},
    async mounted() {
        this.getSalePrice('V0_CAT_VEHICLE').then(res => {
             this.price = res?.price || 0;
        })
        this.getSaleReport('V0_CAT_VEHICLE').then(res => {
            this.amount = res?.countAvailable || 0;
        })
    },
}
</script>

<style scoped lang='scss'>

</style>