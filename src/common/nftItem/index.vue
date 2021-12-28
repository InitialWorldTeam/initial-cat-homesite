<template>
    <div class="box-cat-item" :class="{'app': app}">
        <!-- NFT展示 -->
        <main>
            <div 
                v-for="(item, index) in nftItem.priority" 
                :key="item.id"
                class="box-cat-part-item"
                :style="{'z-index': 100 - index}"
            >   
                <template v-if="checkIsArray(nftItem.preview[item])">
                    <div 
                        v-for="catChild in nftItem.preview[item]" 
                        :key="catChild.id"
                        class="box-cat-item-img"
                        :style="{'z-index': catChild.z}"
                    >
                        <img :src="catChild.url" v-if="catChild.url">
                    </div>
                </template>
                <template v-else>
                    <div class="box-cat-item-img">
                        <img :src="nftItem.preview[item]" alt="">
                    </div>
                </template>
            </div>
        </main>
        <!-- 按钮 -->
        <div 
            class="btn-sell" 
            @click="sellCat(nftItem)"
            v-if="showSell"
        >Sell</div>
    </div>
</template>

<script>
import UTILS from '@/config/util';

export default {
    //部件
    components: {},
    //静态
    props: {
        nftItem: {
            type: Object,
            default: {}
        },
        showSell: {
            type: Boolean,
            default: false
        },
        app: {
            type: Boolean,
            default: false
        },
    },
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {},
    //数据
    data() {
        return {};
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        checkIsArray(arr) {
            return UTILS.checkIsArray(arr);
        },
        sellCat(cat) {
            this.$emit('sell', cat);
        }
    },
    //请求数据
    created() {},
    mounted() {
        
    }
};
</script>

<style scoped lang="scss">
.box-cat-item {
    width: 150px;

    &.app {
        width: 83px;

        main {
            min-height: 125px;
        }
    }
    
    .div-#{index}{
        z-index: 100 - index;
    };

    &:not(:last-child) {
        margin-right: 80px;
    }

    main {
        position: relative;
        min-height: 226px;
        border-radius: 4px;
        overflow: hidden;

        .box-cat-part-item {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        .box-cat-item-img {
            @extend .box-cat-part-item;
        }
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .btn-sell {
        height: 54px;
        margin-top: 27px;
        @include btn-common;
    }
}
.box-sell-modal-img {
    width: 180px;

    main {
        height: 270px;
    }
}
</style>
