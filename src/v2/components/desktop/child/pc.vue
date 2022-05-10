<template>
    <div class="container-desktop" :style="[desktopStyle]"></div>
</template>

<script>
import Base from './base';

export default {
    mixins: [Base],
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        desktopStyle() {
            return {
                'background-image': `url(${this.bgImg})` 
            }
        }
    },
    //数据
    data(){
      return {
          bgImg: require('../img/img-desktop.png').default
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {},
    //请求数据
    created() {},
    mounted() {},
}
</script>

<style scoped lang="scss">
.container-desktop {
    width: 100vw;
    height: 100vh;
    @include bg-item;
    background-size: cover;
}
</style>
