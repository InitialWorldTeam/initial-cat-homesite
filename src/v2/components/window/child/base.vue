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
            const LIST = this.isApp ? this.styleListApp : this.styleList;
            const STYLE = LIST[newVal];
            this.winStyle = STYLE;

            const excludePath = [
                {
                    name: 'Collectibles',
                    title: '',
                    titleApp: 'NFT Details'
                }
            ];

            for(let item of excludePath) {
                if (item.name.includes(newVal)) {
                    this.navTitle = this.isApp ? item.titleApp : item.title;
                } else {
                    this.navTitle = null;
                }
            }
            
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
          styleListApp: {
              'Email subscription': {
                  width: '',
                  height: 'auto'
              }
          },
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
          winStyle: null,
          navTitle: null
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
