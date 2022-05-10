<template>
    <div class="container-foot-bar">
        <template v-for="(item, index) in navList" >
            <div 
                :key="item.id"
                class="box-nav-item"
                :class="{
                    'cur': curNav === item.name
                }"
                @click="goToNav(item)"
            >
                <div class="box-icon">
                    <img :src="item.img" class="img-block">
                </div>
                <div class="box-name" v-text="item.name"></div>
            </div>

            <div 
                class="box-divide" 
                :key="item.id" 
                v-if="index === navList.length - 2">
            </div>
        </template>
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
    position: absolute;
    left: 50%;
    bottom: 48px;
    z-index: 1;
    background-color: rgba($color: #5122AE, $alpha: 0.5);
    border: 1px solid rgba($color: #9D68F0 , $alpha: 1);
    box-shadow: 0px 0px 34px 6px rgba(88, 55, 147, 0.57);
    padding: 15px 30px;
    border-radius: 22px;
    transform: translateX(-50%);
    display: flex;
    height: 82px;
    align-items: flex-end;

    .box-divide {
        width: 1px;
        height: 57px;
        background: #A777FD;
        margin: 0 26px -3.5px 5px;
    }

    .box-nav-item {
        width: 50px;
        height: 50px;
        cursor: pointer;
        transition: all .5s;
        position: relative;

        &:not(:last-child) { 
            margin-right: 21px;
        }

        &:hover {
            width: 81px;
            height: 81px;

            .box-name {
                opacity: 1;
                transition: all .3s;
            }
        }

        &.cur {
            &::after {
                content: "";
                width: 4px;
                height: 4px;
                background: #DACCF4;
                border-radius: 100%;
                position: absolute;
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
            }
        }

        .box-icon {
            height: 100%;

            img {
                transform: translateZ(0);
            }
        }

        .box-name {
            opacity: 0;
            position: absolute;
            left: 50%;
            top: -40px;
            z-index: 2;
            transform: translateX(-50%);
            background: rgba($color: #552AAC, $alpha: 0.6);
            // border: 1px solid #40188E;
            height: 24px;
            padding: 0 21px;
            color: #fff;
            font-size: 12px;
            width: auto;
            white-space: nowrap;
            @include flexCenter;
            border-radius: 6px;

            &::after {
                content: "";
                width: 0;
                height: 0;
                position: absolute;
                bottom: -14px;
                border: 6px solid transparent;
                border-top: 8px solid rgba($color: #552AAC, $alpha: 0.6);;
            }
        }
    }
}
</style>
