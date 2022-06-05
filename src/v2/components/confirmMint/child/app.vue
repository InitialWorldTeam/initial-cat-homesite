<template>
    <div class="container-common-confrim-mint">
        <main>
            <h1 v-if="+type === 1">You will confirm to consume {{ price }} KSM to open a box?</h1>
            <h1 v-if="+type === 2">You will confirm to use key to open a box?</h1>
            <div class="box-btns">
                <div class="btn-item btn-confirm" @click="handleConfirm">Confirm</div>
                <div class="btn-item btn-cancel" @click="handleCancel">Cancel</div>
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
.container-common-confrim-mint {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    left: 0;
    top: 0;
    @include flexCenter;
    background-color: rgba($color: #000000, $alpha: 0.4);

    main {
        width: 84vw;
        height: auto;
        border-radius: 12px;
        @include flex;
        flex-direction: column;
        padding: 36px 20px 28px;
        background-color: #fff;

        h1 {
           font-size: 14px;
           font-weight: normal;
           line-height: 20px;
            color: #545356;
        }

        .box-btns {
            margin-top: 24px;
            @include flexCenter;
            gap: 12px;
            width: 100%;

            .btn-item {
                flex: 1;
                height: 38px;
                border-radius: 8px;
                @include flexCenter;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
            }
            .btn-confirm {
                background: #A06FF8;
            }
            .btn-cancel {
                background: #01A28D;
            }
        }
    }
}
</style>