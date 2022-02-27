<template>
    <div 
        class="container-navbar-top container-navbar-mobile"
    >
        <div class="container-cat-common-content flexBetween">
            <!-- Logo -->
            <div class="box-logo bg-item"></div>

            <div class="box-right flex">
                <!-- 钱包 -->
                <div class="box-wallet" v-if="curRootWallet">{{ curRootWallet.address | addressFormat }}</div>
                <div class="btn-connect-wallet" v-else @click="initWallet">Connect Wallet</div>

                <!-- 菜单按钮 -->
                <div class="btn-menu" @click="handleShowMenuModal"></div>
            </div>
        </div>

        <!-- Menu -->
        <transition name="fade">
            <div class="box-menu-modal" v-if="isShowMenu" @click="goToPage()">
                <main @click.stop>
                    <!-- 导航 -->
                    <nav class="box-nav">
                        <div
                            class="box-nav-item"
                            :class="{ cur: curNav === item.name }"
                            v-for="item in navList"
                            :key="item.name"
                            v-text="item.name"
                            @click="goToPage(item)"
                        ></div>
                    </nav>
                </main>
            </div>
        </transition>
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
    filters: {
        addressFormat(add) {
            if (!add) {
                return;
            }
            const res = add.substring(0, 6) + '***' + add.substr(-4, 4);
            return res;
        }
    },
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {},
    //数据
    data() {
        return {

        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        
    },
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped lang="scss">
.container-navbar-top {
    height: 40px;
    @include flexBetween;
    width: 100vw;
}
.container-cat-common-content {
    padding: 0 20px;
    width: 100%;
    min-width: auto;

    .box-logo {
        height: 18px;
        width: 80px;
        background-image: url(../../../assets/img/common/img-logo-world.png);
    }

    .box-right {
        font-weight: 400;
    }

    .box-wallet {
        color: #77E1FD;
        margin-right: 11px;
        font-size: 11px;
        line-height: 15px;
    }

    .btn-connect-wallet {
        @include btn-common;
        height: 17px;
        // width: 85px;
        font-size: 10px;
        padding: 0 10px;
        margin-right: 9px;
        letter-spacing: -1px;
    }

    .btn-menu {
        height: 15px;
        width: 17px;
        @include bg-item;
        background-image: url(../../../assets/img/common/icon-menu.png);
        cursor: pointer;
    }
}
.box-menu-modal {
    @extend .modal-common;
    background-color: rgba($color: #000000, $alpha: 0.9);

    main {
        height: auto;
        width: 100%;
        background-color: transparent;
        
        .box-nav {
            position: relative;

            .box-nav-item {
                position: relative;
                cursor: pointer;
                width: 142px;
                height: 44px;
                border-radius: 25px;
                font-size: 18px;
                line-height: 20px;
                font-weight: bold;
                color: #fff;
                letter-spacing: -1.3px;
                margin: 0 auto;
                @include flexCenter;

                &.cur {
                    background: #77E1FD;
                    color: #110F19;
                }

                &:not(:last-child) {
                    margin-bottom: 12px;
                }
            }
        }
    }
}
</style>
