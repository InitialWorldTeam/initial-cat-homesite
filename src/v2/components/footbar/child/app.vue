<template>
    <div class="container-foot-bar">
        <div
            @click="goToNav(item)"
            class="box-nav-item"
            v-for="item in navList" 
            :key="item.id">
            <div class="box-img">
                <img :src="item.img" alt="">
            </div>
            <p>{{ item.name }}</p>
        </div>
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
.container-foot-bar {
    position: fixed;
    width: 84vw;
    padding-top: 15vw;
    left: 50%;
    top: 0;
    z-index: 1;
    transform: translateX(-50%);
    display: grid;
    grid-template-columns: repeat(3, minmax(0px, 1fr));
    gap: 6.4vw;

    .box-nav-item {

        .box-img {
            width: 60px;
            height: 60px;
            background: linear-gradient(0deg, #915AF5 0%, #A878FD 100%);
            box-shadow: 0px 1px 2px 0px rgba(88, 55, 147, 0.63);
            border-radius: 14px;
            margin: 0 auto;

            img {
                display: block;
                width: 100%;
                height: 100%;
                transform: translateZ(10px);
            }
        }

        p {
            font-size: 10px;
            font-family: MyriadPro;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 14px;
            text-align: center;
            margin-top: 7px;
            letter-spacing: -0.2px;
        }
    }
}
</style>
