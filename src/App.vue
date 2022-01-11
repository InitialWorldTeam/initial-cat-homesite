<template>
    <div 
        id="app" 
        :class="{'app': isApp, 'load': loading}"
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <!-- 顶部导航 -->
        <Nav></Nav>
        <!-- 路由视图 -->
        <router-view />
    </div>
</template>

<script>
import Nav from './components/nav';
import common from './common/common';

export default {
    name: "App",
    mixins: [ common ],
    components: {
        Nav
    },
    data() {
        return {};
    },
    computed: {},
    methods: {},
    created() {
        this.checkIsApp();
        this.checkCurrentRoute();
        this.checkIsLoadWallet();
    },
    mounted() {
        /**
         * Auto connect
         * if mobile
         *  */
        if (this.isApp) {
            this.initWallet();
        }
        window.addEventListener("resize", () => {
            this.checkIsApp();
        });
    }
};
</script>

<style lang="scss">
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    color: #fff;
    position: relative;
    background-color: #121018;
    min-height: 100vh;

    &.app {
        min-width: 100vw;
    }

    &.load {
        height: 100vh;
        overflow: hidden;
    }
}
</style>
