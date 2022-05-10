<template>
    <div>
    
    </div>
</template>

<script>
import common from "@/common/common";
import Mystery from '../news/mystery.vue';
import Speedboat from '../news/speedboat.vue';

export default {
    mixins: [common],
    //部件
    components: {
        'mystery': Mystery,
        'speedboat': Speedboat,
    },
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        curComponent() {
            return this.menuList[this.curMenuIdx];
        }
    },
    //数据
    data(){
      return {
          curMenuIdx: 0,
          menuList: [
              {
                  name: 'Mystery Box KEY',
                  img: require('../img/img-mystery.png'),
                  componentName: 'mystery'
              },
              {
                  name: 'SpeedBoat Box KEY',
                  img: require('../img/img-speed.png'),
                  componentName: 'speedboat'
              },
          ],
          
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        handleClose() {
            this.$router.push({
                path: '/'
            })
        },
        selectMenu(index) {
            this.curMenuIdx = index;
        }
    },
    //请求数据
    created() {},
    mounted() {},
}
</script>

<style lang='scss'>
.container-event-news {
    padding: 37px 57px 40px 40px;

    h1 {
        font-size: 26px;
        line-height: 32px;
    }
    h2 {
        font-size: 12px;
        font-weight: 400;
        color: #848484;
        line-height: 14px;
        margin-top: 15px;
    }
    article {
        margin-top: 48px;

        p {
            font-size: 16px;
            line-height: 22px;

            &:not(:last-child) {
                margin-bottom: 16px;
            }
        }
    }
}
</style>