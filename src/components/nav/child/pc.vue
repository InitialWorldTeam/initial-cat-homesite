<template>
    <div class="container-cat-common container-navbar-top">
        <div class="container-cat-common-content flexBetween">
            <!-- Logo -->
            <div class="box-logo bg-item"></div>

            <div class="box-right flex">
                <!-- 导航 -->
                <nav class="box-nav flex">
                    <div
                        class="box-nav-item"
                        :class="{ cur: curNav === item.name }"
                        v-for="item in navList"
                        :key="item.name"
                        v-text="item.name"
                        @click="goToNav(item)"
                    ></div>
                    <!-- 滚动条 -->
                    <div class="block-line" ref="navLine"></div>
                </nav>

                <!-- 钱包 -->
                <div class="box-wallet">{{ curWallet }}</div>
            </div>
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
        return {
            curWallet: '0xD67C***65E7'
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        goToNav(item) {
            const e = event.target;
            const LEFT = e.offsetLeft + e.clientWidth / 2;
            this.$refs.navLine.style.left = LEFT + 'px';
            this.goToPage(item);
        }
    },
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped lang="scss">
.container-navbar-top {
    height: 86px;
}
.container-cat-common-content {
    .box-logo {
        height: 44px;
        width: 164px;
        background-image: url(../../../assets/img/common/img-logo-cat.png);
    }

    .box-right {
        font-size: 20px;
        line-height: 24px;
        font-weight: 400;
    }

    .box-nav {
        position: relative;

        .block-line {
            position: absolute;
            width: 31px;
            height: 2px;
            background: #77e1fd;
            border-radius: 4px;
            left: 27px;
            bottom: -14px;
            transform: translate(-50%, 0);
            transition: all .3s;
        }

        .box-nav-item {
            position: relative;
            cursor: pointer;

            &:not(:last-child) {
                margin-right: 36px;
            }
        }
    }

    .box-wallet {
        color: #77E1FD;
        margin-left: 80px;
    }
}
</style>
