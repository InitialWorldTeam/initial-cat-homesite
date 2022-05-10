<template>
    <div 
        id="app" 
        :class="{'app': isApp, 'load': loading}"
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <!-- 顶部状态栏 -->
        <top-bar></top-bar>

        <!-- 通用桌面 -->
        <desktop></desktop>

        <!-- 底部导航栏 -->
        <foot-bar></foot-bar>

        <!-- 路由视图 -->
        <window>
            <router-view />
        </window>
        
    </div>
</template>

<script>
import TopBar from './components/topbar';
import FootBar from './components/footbar';
import Desktop from './components/desktop';
import Window from './components/window';
import common from '@/common/common';

export default {
    name: "App",
    mixins: [ common ],
    components: {
        TopBar,
        FootBar,
        Desktop,
        Window
    },
    data() {
        return {};
    },
    computed: {},
    methods: {},
    created() {
        this.checkIsApp();
        this.checkIsLoadWallet();
    },
    async mounted() {
        /**
         * Auto connect wallet if mobile
         *  */
        if (this.isApp) {
            this.initWallet();
        }
        window.addEventListener("resize", () => {
            this.checkIsApp();
        });
        this.getKusamaPrice();
    }
};
</script>

<style lang="scss">
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    color: #545356;
    position: relative;
    background-color: #fff;
    height: 100vh;
    width: 100vw;

    &.load {
        height: 100vh;
        overflow: hidden;
    }
}
</style>
