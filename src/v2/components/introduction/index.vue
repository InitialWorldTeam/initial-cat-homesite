<template>
    <div>
        <app v-if="isApp"></app>
        <pc v-else></pc>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import pc from './child/pc';
import app from './child/app';

export default {
    //部件
    components: {
        app,
        pc
    },
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        ...mapState([
            'isApp'
        ])
    },
    //数据
    data(){
      return {}
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {},
    //请求数据
    created() {},
    mounted() {},
}
</script>

<style lang="scss" scoped>

</style>