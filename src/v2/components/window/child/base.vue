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
        curNav(newVal) {
            const STYLE = this.styleList[newVal];
            this.winStyle = STYLE;
        }
    },
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        isShowWin() {
            const exclude = ['Home'];
            return !exclude.includes(this.curNav);
        },
        isShowHead() {
            const exclude = ['Event'];
            return !exclude.includes(this.curNav);
        }
    },
    //数据
    data(){
      return {
          styleList: {
              'Connect Wallet': {
                  width: '712px',
                  height: '340px'
              },
              'Email subscription': {
                  width: '712px',
                  height: '220px'
              }
          },
          winStyle: null
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        handleClose() {
            this.$router.push({
                path: '/'
            })
        }
    },
    //请求数据
    created() {},
    mounted() {},
}
</script>

<style scoped lang='scss'>

</style>
