<template>
    <div class="box-common-mint">
        <!-- Mint Info -->
        <div class="box-info">
            <div class="box-banner">
                <h1>SpeedBoat Box</h1>
                <img :src="bannerImg" alt="" />
            </div>

            <div class="box-right">
                <div class="box-publish"></div>
                <div class="box-time-start" v-if="timeData">
                    <p>Remaining Amount<span>{{ amount }}/∞</span></p>
                    <div class="box-left-time" v-if="false">
                        <span>Sale starts in</span>
                        <template v-for="item in timeData">
                            <i :key="item.id">{{ item.value }}</i>
                            <span :key="item.id">{{ item.unit }}</span>
                        </template>
                    </div>
                </div>
                <div class="box-price">
                    <p>Price</p>
                    <div class="content">{{ price }} KSM</div>
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
                <div class="box-des-info" v-if="fasle">
                    <div class="box-info-item">
                        <h3>Issue Price</h3>
                        <div class="content">
                            <i class="icon-logo"></i>1 KSM
                        </div>
                    </div>
                    <div class="box-info-item">
                        <h3>Quantity Issued</h3>
                        <div class="content">3000</div>
                    </div>
                    <div class="box-info-item">
                        <h3>Issue date</h3>
                        <div class="content">2022-04-30</div>
                    </div>
                </div>
                <p>
                    InitialCat Speed​​Boat is the first PGC content SubMetaverse from InitialWorld. It's more of a competitive game.You can use your InitialCat and other NFTs to enter the InitialCat SpeedBoat and get more NFTs and Tokens (Beta) in it.The boat is the key prop of the InitialCat SpeedBoat, of course, you can also use the boat given by the system. If you like to collect and improve the attributes in the SubMetaverse, you can directly buy the SpeedBoat Box to get more advanced SpeedBoats.
                </p>
                <p>
                    You can get all of InitialCat Speedboat's main props from Speedboat Box, and 15 types of speedboats launched in the first phase.Now, we have opened some equipment NFT items, so that you can get equipment for free by doing quests.You will soon be able to see them and use them in the InitialWorld User Client. Upfront, they will be in your wallet.
                </p>
            </div>

            <!-- Introduction -->
            <div class="box-introduction">
                <h2>Rules Introduction</h2>
                <p>
                    There will be 3,000 SpeedBoat Boxes on sale, and 510 will be launched in the first phase of this issue, which can be launched in the form of KEY exchange. Please read the Event section for the rules for obtaining KEY.
                </p>
                <p>
                    Each SpeedBoat Box released this time contains a racing boat NFT, which is the core asset in InitialWorld's SubMetaverse-SpeedBoat. has special properties.
                </p>
                <p>
                    Users can rig and improve InitialCat properties in SubMetaverse-SpeedBoat in the InitialWorld client.
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
            v-if="isShowConfirmPop"
            :price="price"
            type="1"
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
    padding: 26px 18px 30px;
    height: 100%;
    position: relative;

    >main {
        height: 400px;
        padding-top: 40px;
        overflow-y: auto;
    }

    .box-info {

        .box-right {
            margin-top: 21px;

            h1 {
                font-size: 28px;
                font-weight: bold;
                color: #545356;
                line-height: 20px;
            }

            .box-publish {
                height: 25px;
                background: url(../img/img-publisher.png) no-repeat left center /
                    auto 100%;
            }

            .box-time-start {
                margin-top: 26px;

                p {
                    font-size: 13px;
                    font-weight: 600;
                    color: #848484;
                    line-height: 16px;
                    @include flex;

                    span {
                        font-size: 16px;
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
                margin-top: 22px;

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
                gap: 10px;
                margin-top: 12px;

                .btn-item {
                    flex: 1;
                    height: 38px;
                    border-radius: 10px;
                    @include flexCenter;
                    color: #fff;
                    font-size: 14px;
                    font-weight: bold;
                    line-height: 24px;
                    cursor: pointer;
                }
                .btn-mint {
                    background: #a06ff8;
                }
                .btn-key {
                    background: #01A28D;
                }
            }
        }

        .box-banner {
            text-align: center;

            h1 {
                font-size: 20px;
                font-weight: bold;
                color: #545356;
                line-height: 21px;
                margin-bottom: 16px;
            }

            img {
                display: block;
                height: 70vw;
                height: 70vw;
                margin: 0 auto;
                transform: translateZ(10px);
            }
        }
    }

    .box-description {
        color: #545356;

        h2 {
            font-size: 19px;
            font-weight: bold;
            line-height: 22px;
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
            margin-top: 24px;
            font-size: 13px;
            line-height: 18px;
        }
    }

    .box-introduction {
        margin-top: 40px;
        color: #545356;

        h2 {
            font-size: 20px;
            font-weight: bold;
            line-height: 22px;
            margin-bottom: 24px;
        }

        p {
            font-size: 13px;
            line-height: 18px;

            &:not(:last-child) {
                margin-bottom: 15px;
            }
        }
    }

    .box-content {
        margin-top: 44px;
        
        > h2 {
            margin-bottom: 22px;
        }

        section {
            display: flex;
            flex-wrap: wrap;

            .box-series-item {
                width: 100%;
                height: 105px;
                display: flex;
                background: linear-gradient(0deg, #cfafff 0%, #aa85f3 100%);
                border-radius: 12px;
                overflow: hidden;
                margin-bottom: 20px;
                margin-right: 10px;

                .left {
                    height: 100%;
                    width: 131px;
                    @include flexCenter;

                    img {
                        display: block;
                        height: 80px;
                        // width: 85%;
                    }
                }
                .right {
                    flex: 1;
                    height: 100%;
                    background: #68379b;
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
    font-size: 20px;
    font-weight: bold;
    line-height: 22px;
}
</style>
