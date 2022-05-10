<template>
    <div class="container-top-bar">
        <div class="box-left">
            <div 
                v-for="item in communityList" 
                :key="item.id"
                class="box-community-item"
                :class="[`item-${item.name}`, {'link': item.url}]"
                @click="goToUrl(item)"
            >
                <img :src="item.img">
            </div>
        </div>

        <div class="box-right">
            <!-- 已连接 -->
            <div 
                v-if="curRootWallet"
                class="box-cur-wallet"
                @click="handleConnect"
            >{{ curRootWallet.address | addressFormat }}</div>
            <!-- 未连接 -->
            <div class="btn-connect" @click="handleConnect" v-else>Connect Wallet</div>
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

<style scoped lang="scss">
.container-top-bar {
    @include flexBetween;
    height: 52px;
    background: #9D6AF9;
    padding: 0 35px;
    position: absolute;
    width: 100vw;
    left: 0;
    top: 0;
    z-index: 1;

    .box-left {
        @include flex;

        .box-community-item {
            width: 22px;

            &:not(:last-child) {
                margin-right: 24px;
            }

            img {
                display: block;
                width: 100%;
                height: auto;
            }
        }

        .item-github {
            width: 18px;
        }
    }

    .box-right {
        color: #fff;
        font-weight: bold;
        line-height: 24px;

        .btn-connect {
            cursor: pointer;
            font-size: 16px;
        }

        .box-cur-wallet {
            font-size: 14px;
            cursor: pointer;
        }
    }
}
.link {
    cursor: pointer;
}
</style>