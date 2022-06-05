<template>
    <div class="container-use-key">
        <div class="btn-back-v2" @click="goBack">Back to SpeedBoat Box</div>

        <main>
            <div class="box-key-list" v-if="useKeyList.length > 0">
                <div v-for="item in useKeyList" :key="item.id" class="box-key-item">
                    <swap-item :swap="item" :title="swapItemTitle" @use="handleStartUse(item)"></swap-item>
                </div>
            </div>

            <!-- no NFT -->
            <template v-else>
                <div class="box-empty-nft"></div>
            </template>
        </main>

        <!-- confirm modal -->
        <common-confirm
            v-if="isShowConfirmPop"
            :type="confirmType"
            ref="confirmMint" 
            @confirm="handleConfirmMint"
            @cancel="handelCancelMint"
        ></common-confirm>


        <!-- NFT Result -->
        <transition name="fade">
            <div class="box-nft-modal" v-if="isShowNftModal">
                <main class="animate__animated animate__bounceIn">
                    <NftShowItem :nftItem="nftData" :customStyle="nftStyle"></NftShowItem>
                    <p @click="clearNftModal">Get it!</p>
                </main>
            </div>
        </transition>
    </div>
</template>

<script>
import Base from './base';
import swapItem from '@/common/swapKeyItem/index.vue';
import commonConfirm from '@/v2/components/confirmMint';
import NftShowItem from "@/common/nftItem/collectItem";

export default {
    mixins: [Base],
    //部件
    components: {
        'swap-item': swapItem,
        commonConfirm,
        NftShowItem
    },
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
.container-use-key {
    height: 100%;
    padding-top: 28px;

    >main {
        height: calc(100% - 40px);
        padding: 0 17px 20px;
        margin-top: 22px;
        overflow-y: auto;
    }
    .box-key-list {
        display: grid;
        grid-gap: 12px;
        grid-template-columns: repeat(2, minmax(0px, 1fr));
    }
}
.box-nft-modal {
    position: absolute;
    z-index: 10;
    background-color: rgba($color: #000000, $alpha: 0.8);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    @include flexCenter;

    >main {
        // width: 300px;
        border-radius: 12px;
        // background-color: #fff;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;

        .box-nft-img {
            height: 300px;

            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .box-cat-item, .box-cat-item-main {
            border-radius: 0;
        }

        p {
            @extend .common-btn-style;
            width: 100%;
            border-radius: 0;
            height: 46px;
        }
    }
}
</style>