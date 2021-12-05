<template>
    <div>
    
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        ...mapState([
            'navList',
            'curNav'
        ])
    },
    //数据
    data(){
      return {}
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        ...mapMutations([
            'setCurNav'
        ]),
        goToPage(item) {
            this.setCurNav(item.name);
            if (!item.path || this.$route.path === item.path) {
                return false;
            };
            this.$router.push({
                path: item.path
            });
        }
    },
    //请求数据
    created() {},
    mounted() {},
}
</script>

<style scoped lang="scss">

</style>