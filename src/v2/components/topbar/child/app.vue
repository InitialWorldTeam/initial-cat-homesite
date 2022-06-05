<template>
    <div class="container-bottom-bar">
        <div
            class="box-tab-item"
            v-for="item in communityListApp" 
            :key="item.id">
            <img :src="item.img" alt="">
        </div>
    </div>
</template>

<script>
import Base from "./base";

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
      return {}
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {},
    //请求数据
    created() {},
    mounted() {},
}
</script>

<style scoped lang='scss'>
.container-bottom-bar {
    width: 84vw;
    height: 70px;
    background: rgba($color: #5122AE, $alpha: 0.5);
    box-shadow: 0px 0px 14px 0px rgba(88, 55, 147, 0.57);
    border-radius: 14px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 6vw;
    transform: translate(-50%, 0);
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .box-tab-item {
        width: 45px;
        height: 45px;
        background: linear-gradient(0deg, #915AF5 0%, #A878FD 100%);
        border-radius: 12px;
        @include flexCenter;
        cursor: pointer;

        img {
            width: 26px;
            height: auto;
            transform: translateZ(10px);
        }
    }
}
</style>