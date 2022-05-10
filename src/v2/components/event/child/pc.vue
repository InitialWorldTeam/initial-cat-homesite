<template>
    <div class="container-event">
        <div class="box-left">
            <header>
                <!-- 按钮区 -->
                <div class="box-btns">
                    <div class="btn-item btn-close" @click="handleClose"></div>
                    <div class="btn-item btn-other"></div>
                </div>

                <!-- Menu -->
                <div class="box-menu">
                    <h3>Event</h3>
                    <div 
                        v-for="(item, index) in menuList" 
                        :key="item.id"
                        class="box-menu-item"
                        :class="{ cur: curMenuIdx === index }"
                        @click.stop="selectMenu(index)"
                    >
                        <img :src="item.img"><span>{{ item.name }}</span>
                    </div>
                </div>
            </header>
        </div>

        <div class="box-right">
            <h2>{{ curComponent.name }}</h2>
            <main>
                <components :is="curComponent.componentName"></components>
            </main>
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
    data() {
        return {};
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {},
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped lang="scss">
.container-event {
    height: 600px;
    display: flex;

    .box-left {
        width: 207px;
        height: 100%;
        background: #e4ddf0;

        header {
            .box-btns {
                height: 46px;
                @include flex;
                padding-left: 16px;

                .btn-item {
                    @include bg-item;
                    height: 12px;
                    background-size: auto 100%;

                    &:not(:last-child) {
                        margin-right: 9px;
                    }
                }
                .btn-close {
                    width: 12px;
                    background-image: url(../img/btn-close.png);
                    cursor: pointer;
                }

                .btn-other {
                    width: 34px;
                    background-image: url(../img/btn-other.png);
                }
            }
        }

        .box-menu {
            padding: 0 10px;

            h3 {
                font-size: 14px;
                font-family: MyriadPro;
                font-weight: 600;
                color: #848484;
                line-height: 28px;
                margin-bottom: 10px;
                padding-left: 5px;
            }

            .box-menu-item {
                height: 39px;
                border-radius: 6px;
                margin-bottom: 6px;
                cursor: pointer;
                @include flex;
                padding-left: 15px;

                &.cur, &:hover {
                    background: #C8BED9;
                }

                img {
                    width: 11px;
                    height: auto;
                }

                span {
                    font-size: 14px;
                    line-height: 28px;
                    margin-left: 8px;
                }
            }
        }
    }

    .box-right {
        flex: 1;

        >h2 {
            height: 46px;
            background: #F9F6FD;
            @include flex;
            padding-left: 40px;
            font-size: 18px;
            line-height: 28px;
            font-weight: bold;   
        }

        >main {
            height: calc(100% - 46px);
            overflow-y: auto;
        }
    }
}
</style>
