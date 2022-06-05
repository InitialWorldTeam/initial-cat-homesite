<template>
    <div class="container-email">
        <h3>Stay up-to-date about new features and supported apps & games.</h3>
        <div class="box-sub">
            <input type="text" :placeholder="placeholderText" v-model="userEmail">
            <div class="btn-sub" @click="preventDoublePress(handleSubEmail)">Subscribe</div>
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
.container-email {
    padding: 36px 64px;

    h3 {
        font-size: 18px;
        font-weight: 400;
        color: #545356;
        line-height: 20px;
    }

    .box-sub {
        margin-top: 21px;
        display: flex;

        input {
            width: 452px;
            height: 50px;
            border: 1px solid #A080D4;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            font-size: 16px;
            font-weight: 400;
            color: #949494;
            line-height: 20px;
            padding: 0 16px;
        }

        .btn-sub {
            width: 132px;
            height: 50px;
            background: #A06FF8;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            color: #fff;
            @include flexCenter;
            cursor: pointer;
            font-size: 18px;
            line-height: 24px;
            font-weight: bold;
        }
    }
}
</style>
