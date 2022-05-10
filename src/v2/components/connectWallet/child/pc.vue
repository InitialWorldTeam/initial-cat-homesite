<template>
    <div class="container-connect-wallet">
        <!-- wallet QrCode -->
        <div class="box-qrcode" v-if="showCode">
            <div class="btn-back-v2" @click="handleBackToWallet">Back to wallet selection</div>

            <div class="box-code">
                <img :src="codeUrl" alt="">
                <h4>{{ codeAddress }}</h4>
            </div>
        </div>

        <!-- wallet list -->
        <div class="box-wallet-list" v-else>
            <div 
                v-for="(item, index) in walletAccounts" 
                :key="item.id"
                class="box-wallet-item"
                @click="selectWallet(index)"
            >
                <div class="box-info">
                    <h3>InitialWorld</h3>
                    <div class="box-address">
                        <p>{{ item.address }}</p>
                        <div 
                            class="btn-item btn-copy"
                            @click.stop
                            v-clipboard:copy="item.address"
                            v-clipboard:success="onCopy">
                        </div>
                        <div 
                            class="btn-item btn-code"
                            @click.stop="handleShowCode(item)"
                        ></div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Base from './base';

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
.container-connect-wallet {
    padding-top: 36px;

    .box-qrcode {

        .box-code {
            @include flexCenter;
            flex-direction: column;

            img {
                width: 160px;
                height: 160px;
            }

            h4 {
                font-size: 14px;
                font-family: Myriad Pro;
                font-weight: bold;
                color: #545356;
                line-height: 20px;
                margin-top: 20px;
            }
        }
    }

    .box-wallet-list {
        padding: 0 95px;

        .box-wallet-item {
            height: 72px;
            border: 1px solid #A080D4;
            border-radius: 8px;
            @include flex;
            padding-left: 70px;
            background: url(../img/img-logo.png) no-repeat left 20px center / 36px auto;
            cursor: pointer;
            
            &:not(:last-child) {
                margin-bottom: 20px;
            }

            .box-info {
                color: #545356;
                line-height: 20px;

                h3 {
                    font-size: 16px;
                    font-weight: bold;
                    
                }

                .box-address {
                    @include flex;

                    p {
                        font-size: 14px;
                        max-width: 346px;
                        @include ellipsis;
                    }

                    .btn-item {
                        margin-left: 10px;
                        width: 12px;
                        height: 12px;
                    }
                    .btn-copy {
                        @include bg-item;
                        background-image: url(../img/img-copy.png);
                    }
                    .btn-code {
                        @include bg-item;
                        background-image: url(../img/img-qrcode.png);
                        width: 16px;
                        height: 16px;
                    }
                }
            }
        }
    }
}
</style>
