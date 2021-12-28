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
import { mapMutations } from "vuex";
import Nav from './components/nav';
import common from './common/common';

export default {
    name: "App",
    mixins: [ common ],
    components: {
        Nav
    },
    data() {
        return {
            isApp: false
        };
    },
    computed: {},
    methods: {
        ...mapMutations(["setClientType"]),
        isMobile() {
            if (
                window.navigator.userAgent.match(
                    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                )
            ) {
                this.isApp = true; // 移动端
            } else {
                this.isApp = false; // PC端
            }

            this.setClientType(this.isApp);
        }
    },
    created() {
        this.isMobile();
    },
    mounted() {
        /**
         * Auto connect
         * if mobile
         * if has get wallet
         *  */
        this.checkCurrentRoute();

        if (this.isApp || this.getCurWallet) {
            this.initWallet();
        }
        window.addEventListener("resize", () => {
            this.isMobile();
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
    overflow: hidden;
    background-color: #121018;
    min-height: 100vh;
    min-width: 1400px;

    &.app {
        min-width: 100vw;
    }

    &.load {
        height: 100vh;
        overflow: hidden;
    }
}
</style>
