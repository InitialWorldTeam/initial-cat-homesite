<template>
    <div class="box-common-mint">
        <!-- Mint Info -->
        <div class="box-info">
            <div class="box-banner">
                <img :src="bannerImg" alt="" />
            </div>

            <div class="box-right">
                <h1>InitialWorld Mystery Box</h1>
                <div class="box-publish"></div>
                <div class="box-time-start">
                    <p>Remaining Amount<span>{{ amount }}/∞</span></p>
                </div>
                <div class="box-price">
                    <p>Price</p>
                    <div class="content">{{ price }} KSM </div>
                </div>
                <div class="box-btns">
                    <div class="btn-item btn-key" @click="handleShowKeyList">USE KEY</div>
                    <div class="btn-item btn-mint" @click="handleShowMint">MINT NOW</div>
                </div>
            </div>
        </div>

        <main>
            <!-- Description -->
            <div class="box-description">
                <h2>Product Detail & Description</h2>
                <div class="box-des-info" v-if="false">
                    <div class="box-info-item">
                        <h3>Issue Price</h3>
                        <div class="content">
                            <i class="icon-logo"></i>0 KSM
                        </div>
                    </div>
                    <div class="box-info-item">
                        <h3>Quantity Issued</h3>
                        <div class="content">∞</div>
                    </div>
                    <div class="box-info-item">
                        <h3>Issue date</h3>
                        <div class="content">2022-04-07</div>
                    </div>
                </div>
                <p>
                    You can get all of InitialWorld's main props from Mystery Box, such as hats, clothing, shoes, handhelds, etc.Now, we have opened some equipment NFT items, so that you can get equipment for free by doing quests.You will soon be able to see them and use them in the InitialWorld User Client. Upfront, they will be in your wallet.
                </p>
            </div>

            <!-- Introduction -->
            <div class="box-introduction">
                <h2>Rules Introduction</h2>
                <p>
                    There will be ∞ mysterious boxes to be launched, which will be launched in the form of KEY exchange in the early stage. Please read the Event section for the rules for obtaining KEY.
                </p>
                <p>
                    Each mystery box in this launch contains an equipped NFT, which is a core asset in InitialWorld. With GentlemanCat, StarCat, MotionCat, AvareCat and other series of suits.
                </p>
                <p>
                    Users can equip and improve InitialCat attributes in the InitialWorld user client.
                </p>
            </div>

            <!-- Content -->
            <div class="box-content">
                <h2 class="group-h2">Series Content</h2>
                <section>
                    <div
                        v-for="item in seriesList"
                        :key="item.id"
                        class="box-series-item"
                    >
                        <div class="left">
                            <img :src="item.img" alt="" />
                        </div>
                        <div class="right">
                            <h1>{{ item.name }}</h1>
                            <h2>Issue Amount :{{ item.amount }}</h2>
                            <h2>Probability :{{ item.probability }}</h2>
                        </div>
                    </div>
                </section>
            </div>
        </main>

        <!-- confirm modal -->
        <common-confirm
            v-show="isShowConfirmPop"
            :price="price"
            :type="1"
            ref="confirmMint" 
            @confirm="handleConfirmMint"
            @cancel="handelCancelMint"
            @showNftResult="handleShowNftResult"
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
import Base from "./base";
import commonConfirm from '@/v2/components/confirmMint';
import NftShowItem from "@/common/nftItem/collectItem";

export default {
    mixins: [Base],
    //部件
    components: {
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
    data() {
        return {};
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {},
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped lang="scss">
.box-common-mint {
    padding: 44px 100px 0 92px;
    height: 100%;
    position: relative;

    >main {
        height: calc(100% - 340px);
        padding-top: 35px;
        overflow-y: auto;
        margin-top: 10px;
    }

    .box-info {
        display: flex;
        justify-content: space-between;

        .box-right {
            width: 400px;

            h1 {
                font-size: 28px;
                font-weight: bold;
                color: #545356;
                line-height: 20px;
            }

            .box-publish {
                margin-top: 22px;
                height: 25px;
                background: url(../img/img-publisher.png) no-repeat left center /
                    auto 100%;
            }

            .box-time-start {
                margin-top: 35px;

                p {
                    font-size: 16px;
                    font-weight: 600;
                    color: #848484;
                    line-height: 16px;

                    span {
                        font-size: 18px;
                        color: #545356;
                        font-weight: bold;
                        margin-left: 8px;
                    }
                }
                .box-left-time {
                    height: 50px;
                    background: #e2d4f8;
                    border-radius: 8px;
                    margin-top: 8px;
                    @include flexCenter;
                    letter-spacing: -0.5px;

                    span {
                        font-size: 14px;
                        font-weight: 600;
                        color: #816aaf;
                        line-height: 24px;

                        &:not(:last-child) {
                            margin-right: 8px;
                        }
                    }

                    i {
                        font-style: normal;
                        width: 28px;
                        height: 28px;
                        background: #5e37a6;
                        border-radius: 4px;
                        margin-right: 6px;
                        font-size: 18px;
                        font-weight: bold;
                        color: #ffffff;
                        @include flexCenter;
                    }
                }
            }

            .box-price {
                margin-top: 34px;

                p {
                    font-size: 16px;
                    font-weight: 600;
                    color: #848484;
                    line-height: 20px;
                }

                .content {
                    margin-top: 9px;
                    height: 22px;
                    background: url(../img/img-ksm.png) no-repeat left center /
                        auto 100%;
                    padding-left: 28px;
                    font-size: 24px;
                    font-weight: bold;
                    color: #545356;
                    line-height: 24px;

                    span {
                        font-size: 20px;
                        font-weight: normal;
                    }
                }
            }

            .box-btns {
                display: flex;
                margin-top: 75px;
                
                .btn-item {
                    width: 196px;
                    height: 50px;
                    border-radius: 8px;
                    @include flexCenter;
                    color: #fff;
                    font-size: 18px;
                    font-weight: bold;
                    line-height: 24px;
                    cursor: pointer;
                }

                .btn-mint {
                    background: #a06ff8;
                }
                .btn-key {
                    background: #01A28D;
                    margin-right: 8px;
                }
            }
        }

        .box-banner {
            width: 326px;
            height: 326px;

            img {
                display: block;
                height: 100%;
                transform: translateZ(0);
            }
        }
    }

    .box-description {
        h2 {
            font-size: 28px;
            font-weight: bold;
            line-height: 30px;
        }

        .box-des-info {
            margin-top: 18px;
            display: flex;

            .box-info-item {
                margin-right: 80px;

                h3 {
                    font-size: 16px;
                    line-height: 16px;
                    font-weight: 600;
                    color: #848484;
                }
                .content {
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 18px;
                    display: flex;
                    margin-top: 9px;

                    .icon-logo {
                        background: url(../img/img-ksm.png) no-repeat left
                            center / auto 100%;
                        width: 17px;
                        height: 17px;
                        margin-right: 6px;
                    }
                }
            }
        }
        p {
            margin-top: 26px;
            font-size: 14px;
            line-height: 22px;
        }
    }

    .box-introduction {
        margin-top: 58px;

        h2 {
            font-size: 28px;
            font-weight: bold;
            line-height: 30px;
            margin-bottom: 28px;
        }

        p {
            font-size: 14px;
            line-height: 20px;

            &:not(:last-child) {
                margin-bottom: 15px;
            }
        }
    }

    .box-content {
        margin-top: 58px;

        > h2 {
            margin-bottom: 28px;
        }

        section {
            display: flex;
            flex-wrap: wrap;

            .box-series-item {
                width: 258px;
                height: 103px;
                display: flex;
                background: linear-gradient(0deg, #AFBFFF 0%, #8689F3 100%);
                border-radius: 12px;
                overflow: hidden;
                margin-bottom: 20px;
                margin-right: 10px;

                &:nth-child(3n) {
                    margin-right: 0;
                }

                .left {
                    height: 100%;
                    width: 115px;
                    @include flexCenter;

                    img {
                        display: block;
                        height: 35px;
                    }
                }
                .right {
                    width: 143px;
                    height: 100%;
                    background: #51379B;
                    color: #fff;
                    padding-top: 22px;
                    padding-left: 17px;

                    h1 {
                        font-size: 16px;
                        line-height: 13px;
                        margin-bottom: 14px;
                    }
                    h2 {
                        font-size: 12px;
                        line-height: 18px;
                    }
                }
            }
        }
    }
}
.group-h2 {
    font-size: 28px;
    font-weight: bold;
    line-height: 30px;
}
</style>
