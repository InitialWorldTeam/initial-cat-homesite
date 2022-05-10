<template>
    <div></div>
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
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {},
    filters: {
        addressFormat(add) {
            if (!add) {
                return;
            }
            const res = add.substring(0, 6) + '***' + add.substr(-4, 4);
            return res;
        }
    },
    //数据
    data(){
      return {
          communityList: [
              {
                  name: 'logo',
                  img: require('../img/icon-logo.png'),
                  url: null
              },
              {
                  name: 'twitter',
                  img: require('../img/icon-twitter.png'),
                  url: "https://twitter.com/InitialWorldLab"
              },
              {
                  name: 'discord',
                  img: require('../img/icon-discord.png'),
                  url: null
              },
              {
                  name: 'medium',
                  img: require('../img/icon-medium.png'),
                  url: "https://medium.com/@InitialWorld"
              },
              {
                  name: 'github',
                  img: require('../img/icon-github.png'),
                  url: null
              }
          ]
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        goToUrl(item) {
            if (item.url) {
                window.open(item.url);
            }
        },
        handleConnect() {
            this.$router.push({
                path: '/connnectWallet'
            })
        }
    },
    //请求数据
    created() {},
    mounted() {},
}
</script>

<style scoped>

</style>