<template>
    <div id="app" :class="{'app': isApp}">
        <!-- 顶部导航 -->
        <Nav></Nav>
        <!-- 路由视图 -->
        <router-view />
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import Nav from './components/nav';

export default {
    name: "App",
    components: {
        Nav
    },
    data() {
        return {
            isApp: false
        };
    },
    computed: {
        
    },
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
            console.log('移动端：', this.$store.state.isApp);
        }
    },
    created() {
        this.isMobile();
    },
    mounted() {
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
}
</style>
