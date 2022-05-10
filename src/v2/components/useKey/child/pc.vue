<template>
    <div class="container-use-key">
        <div class="btn-back-v2" @click="goBack">Back to SpeedBoat Box</div>

        <main>
            <div v-for="item in useKeyList" :key="item.id">
                {{ item }}
            </div>
        </main>
    </div>
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
    computed: {},
    //数据
    data(){
      return {
          
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {},
    //请求数据
    created() {},
    mounted() {}
}
</script>

<style scoped lang="scss">
.container-use-key {
    height: 100%;
    padding-top: 48px;

    main {
        height: calc(100% - 16px);
        padding: 42px;
        overflow-y: auto;
    }
}
</style>
