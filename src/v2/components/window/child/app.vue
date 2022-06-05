<template>
    <div class="container-window" :style="[winStyle]" v-show="isShowWin">
        
        <header v-if="isShowHead">
            <!-- 按钮区 -->
            <div class="box-btns">
                <div class="btn-item btn-close" @click="handleClose"></div>
            </div>

            <!-- 标题 -->
            <h3 v-text="navTitle" v-if="navTitle"></h3>
            <h3 v-text="curNav" v-else></h3>

            <div style="width: 10px;"></div>
        </header>

        <!-- 视图 -->
        <main 
            :class="{
                'full': !isShowHead
            }"
        >
            <slot></slot>
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
    computed: {
        winStyle() {
            return {
                 
            }
        }
    },
    //数据
    data(){
      return {}
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {},
    //请求数据
    created() {},
    mounted() {}
}
</script>

<style scoped lang="scss">
.container-window {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background-color: #fff;
    box-shadow: 0px 12px 54px 3px rgba(88, 55, 147, 0.57);
    border-radius: 12px;
    overflow: hidden;
    width: 90vw;
    height: 90vh;

    header {
        height: 46px;
        background: #F9F6FD;
        @include flexBetween;
        padding: 0 16px;
        border-bottom: 1px solid #E9E9EA;

        .box-btns {
            display: flex;

            .btn-item {
                @include bg-item;
                height: 12px;
                background-size: auto 100%;
                
                &:not(:last-child) {
                    margin-right: 9px;
                }
            }
            .btn-close {
                width: 10px;
                background-image: url(../img/icon-close.png);
                cursor: pointer;
            }

            .btn-other {
                width: 34px;
                background-image: url(../img/btn-other.png);
            }
        }

        h3 {
            font-size: 18px;
            font-weight: 600;
            color: #545356;
            line-height: 28px;
            flex-shrink: 0;
            max-width: 75%;
            @include ellipsis;
        }
    }

    main {
        height: calc(100% - 46px);
        overflow-y: auto;

        &.full {
            overflow: visible;
        }
    }
}
</style>