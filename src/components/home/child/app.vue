<template>
    <div class="container-home container-pc">
        <!-- Banner -->
        <div class="box-banner flexCenter swiper-banner">
            <div class="swiper-wrapper">
                <div
                    class="swiper-slide"
                    v-for="item in bannerListApp"
                    :key="item.id"
                >
                    <img
                        :src="item.img"
                        class="box-img"
                        @click="goToBanner(item)"
                    />
                </div>
            </div>
        </div>

        <section>
            <div>
                <!-- Introduction -->
                <div class="box-section-common box-introduction">
                    <h1>Introduction</h1>
                    <section>
                        <div
                            class="swiper-slide"
                            v-for="item in slideList"
                            :key="item.title"
                        >
                            <div class="box-img">
                                <img :src="item.img" alt="" />
                            </div>
                            <div class="box-content flexBetween">
                                <h3 v-text="item.title"></h3>
                                <div
                                    class="btn-go"
                                    @click="handleGoIntroductDetail(item)"
                                >
                                    Go
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- Mint Avatar -->
                <div class="box-section-common box-mintAvatar">
                    <h1>Free to mint your InitialWorld Avatar</h1>
                    <h2>You only pay the Kusama Gas Fee. One address has One mint chance every day.</h2>
                    <main>
                        <div class="box-top">
                            <img :src="require('../img/img-mint-cat.png').default" alt="" />
                        </div>
                        <div class="box-bottom">
                            <p>
                                The mysterious signal has reached the earth, the
                                cat clan from Inital World has been activated,
                                Wormhole is opened, you have been able to
                                establish contact with Inital World, and all
                                decisions belong to you. Are you ready to join
                                the revolution that will change NFT and
                                Metaverse forever? Our goal is to bring power
                                back to the people. It all started in our Inital
                                World. At this moment, they have awakened, and
                                the revolution has begun, either now or never!
                            </p>
                            <div class="btn-mint" @click="goToMint" v-if="isConnectWallet">
                                Mint Now
                            </div>
                            <div class="btn-mint small" @click="goToConnect" v-else>
                                Connect Wallet
                            </div>
                            <div class="btn-learn-more" @click="goToLearn">Learn more</div>
                        </div>
                    </main>
                </div>

                <!-- Mystery Box -->
                <div class="box-section-common box-specialLoot">
                    <h1>Mystery Box</h1>
                    <h2>Your Own Private NFTs from Mystery Box</h2>
                    <main>
                        <div class="box-left">
                            <img class="img-block" :src="lootBoxImg" />
                        </div>
                        <div class="box-right">
                            <p>
                                You can obtain NFTs launched by SubMetaverse and
                                InitialWorld through Mystery Box. After
                                InitialStudio is opened,you can obtain user-made
                                NFTs through Mystery Box.Wish you have a good
                                time in InitialWorld
                            </p>
                            <div class="btn-enter">Coming soon</div>
                        </div>
                    </main>
                </div>

                <!-- Ecosystem -->
                <div class="box-section-common box-ecosystem">
                    <h1>Ecosystem</h1>
                    <h2>
                        We are creating Metaverse and linking different SubMetaverse
                    </h2>
                    <main>
                        <div class="box-tab" ref="boxEcoTab">
                            <div
                                v-for="(item, index) in ecoTabList"
                                :key="item.id"
                                class="box-tab-item"
                                :class="{ cur: index === cueEcoIdx }"
                                @click="selectEcoTab(index)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <!-- 导航按钮 -->
                        <div
                            class="btn-scroll btn-pre"
                            @click="handleScrollX(1)"
                        ></div>
                        <div
                            class="btn-scroll btn-next"
                            @click="handleScrollX(2)"
                        ></div>

                        <div
                            class="box-content"
                            :class="[
                                'box-eco-type-' + curEcoItem.type,
                                'box-eco-tab-' + cueEcoIdx
                            ]"
                        >
                            <template v-if="curEcoItem.type === 1">
                                <div class="box-left">
                                    <video
                                        :src="curEcoItem.content"
                                        muted
                                        autoplay
                                        loop
                                    ></video>
                                </div>
                                <div class="box-right">
                                    <h2 v-text="curEcoItem.name"></h2>
                                    <p v-text="curEcoItem.des"></p>
                                </div>
                            </template>
                            <template v-if="curEcoItem.type === 2">
                                <div class="box-left">
                                    <img :src="curEcoItem.content" />
                                </div>
                                <div class="box-right">
                                    <h2 v-text="curEcoItem.name"></h2>
                                    <p v-text="curEcoItem.des"></p>
                                </div>
                            </template>
                            <template v-if="curEcoItem.type === 3">
                                <img :src="curEcoItem.content" alt="" />
                            </template>
                        </div>
                    </main>
                </div>

                <!-- Memorial NFT -->
                <div class="box-section-common box-memorialNFT" v-if="false">
                    <h1>Memorial NFT</h1>
                    <h2>
                        Dream Card has a total release of 10,000 cards on Kusama
                    </h2>
                    <div class="box-airdrop">
                        <h3>Airdrop:</h3>
                        <div class="flex">
                            <span class="color1"
                                >A Reward=20000 NIC<i>,</i></span
                            >
                            <span class="color2"
                                >B Reward=15000 NIC<i>,</i></span
                            >
                            <span class="color3"
                                >C Reward=12500 NIC<i>,</i></span
                            >
                            <span class="color4"
                                >D Reward=10000 NIC<i>,</i></span
                            >
                            <span class="color5"
                                >E Reward=5500 NIC<i>,</i></span
                            >
                            <span class="color6"
                                >F Reward=5000 NIC<i>,</i></span
                            >
                            <span class="color7"
                                >G Reward=4500 NIC<i>,</i></span
                            >
                            <span class="color8"
                                >Last Reward=20000 NIC<i>.</i></span
                            >
                        </div>
                    </div>
                    <main>
                        <div class="box-big">
                            <img :src="memorialNftImg.big" />
                        </div>
                        <div class="box-small">
                            <img :src="memorialNftImg.small" />
                        </div>
                    </main>
                </div>

                <!-- Strategic Partners -->
                <div class="box-section-common box-partners">
                    <h1>Strategic Partners</h1>
                    <main>
                        <div
                            v-for="(item, index) in partnerList"
                            :key="item.id"
                            class="box-partner-item"
                        >
                            <img :src="item" :class="'img-' + index" />
                        </div>
                    </main>
                </div>

                <!-- Community -->
                <div class="box-section-common box-community">
                    <h1>Community</h1>
                    <main>
                        <div
                            class="box-community-item"
                            v-for="item in communityList"
                            :key="item.id"
                        >
                            <img :src="item.icon" alt="" />
                            <h4 v-text="item.title"></h4>
                            <div
                                class="btn-join"
                                @click="handleJoinCommunity(item)"
                                v-if="item.url"
                            >
                                Join us
                            </div>
                            <el-tooltip
                                v-else
                                effect="dark"
                                content="Coming soon"
                                placement="bottom"
                                popper-class="popper-coming"
                            >
                                <div class="btn-join" @click="handleJoinCommunity(item)">Join us</div>
                            </el-tooltip>
                        </div>
                    </main>
                </div>

                <!-- Footer -->
                <footer class="box-footer">
                    <div class="box-top">
                        <div class="box-mid">
                            <template v-for="item in navList">
                                <div
                                    v-if="item.path"
                                    class="box-menu-item"
                                    :class="{ cur: curNav === item.name }"
                                    :key="item.name"
                                    v-text="item.name"
                                    @click="goToNav(item)"
                                ></div>
                                <div
                                    class="box-menu-item"
                                    :key="item.name"
                                    v-else
                                >
                                    <el-tooltip
                                        effect="dark"
                                        content="Coming soon"
                                        placement="bottom"
                                        popper-class="popper-coming"
                                    >
                                        <div @click="goToNav(item)">
                                            <span v-text="item.name"></span>
                                        </div>
                                    </el-tooltip>
                                </div>
                            </template>
                        </div>
                        <div class="box-right">
                            <h2>Subscribe to our newsletter</h2>
                            <h3>
                                Stay up-to-date about new features and supported
                                apps & games.
                            </h3>
                            <div class="box-subscribe">
                                <div class="box-input">
                                    <input
                                        type="text"
                                        placeholder="Your e-mail address"
                                        v-model="userEmail"
                                    />
                                </div>
                                <div
                                    class="btn-sub"
                                    @click="preventDoublePress(handleSubEmail)"
                                >
                                    Subscribe
                                </div>
                                <transition name="fade">
                                    <div
                                        class="box-email-tip"
                                        :class="{ error: !checkEmailPass }"
                                        v-text="checkEmailTip"
                                    ></div>
                                </transition>
                            </div>
                        </div>
                    </div>

                    <div class="box-bottom">
                        <div class="box-logo"></div>
                        <div class="box-copyright">
                            @InitialWorld Team. 2021
                        </div>
                    </div>
                </footer>
            </div>
        </section>

        <free-mint ref="freeMint"></free-mint>
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
    data() {
        return {};
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        handleScrollX(type) {
            const left = this.$refs.boxEcoTab.scrollLeft;
            const move = type === 1 ? -80 : 80;
            const rs = left + move;
            this.$refs.boxEcoTab.scrollTo({
                left: rs,
                behavior: "smooth"
            });
        }
    },
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped lang="scss">
.swiper-slide {
    width: 144px;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 6px;

    .box-img {
        height: 88px;
        background-color: #fff;
        overflow: hidden;

        img {
            display: block;
            height: auto;
            width: 100%;
            object-fit: contain;
        }
    }

    .box-content {
        height: 37px;
        background: #161722;
        padding: 0 6px;
        font-size: 10px;
        line-height: 14px;

        h3 {
            font-size: 10px;
            color: #fff;
            width: 70%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        .btn-go {
            font-weight: 400;
            color: #77e1fd;
            padding-right: 10px;
            cursor: pointer;
            background: url(../../../assets/img/home/icon-arrow-right.png)
                no-repeat right center / auto 6px;
        }
    }
}
.container-pc {
    padding-bottom: 80px;
}
.container-home {
    .box-banner {
        height: 56.8vw;
        @include flexCenter;
        overflow: hidden;

        .swiper-slide {
            margin-right: 0;
            border-radius: 0;
        }

        .box-img {
            display: block;
            height: 100%;
            width: 100%;
            object-fit: fill;
            cursor: pointer;
        }

        .box-text {
            position: absolute;
            width: 285px;
            height: auto;
            top: 38%;
            left: 12vw;
            z-index: 1;
        }
    }

    > section {
        flex-direction: column;
        padding: 38px 20px 0;

        .box-section-common {
            position: relative;

            > h1 {
                font-size: 20px;
                line-height: 26px;
            }

            > h2 {
                line-height: 12px;
                font-size: 11px;
                font-weight: 400;
                color: #3e3e47;
                margin-top: 7px;
            }
        }
    }

    .box-introduction {
        section {
            margin-top: 15px;
            @include flex;
            overflow-x: auto;
            padding-right: 10px;
            width: calc(100vw - 20px);
        }
    }

    .box-mintAvatar {
        margin-top: 37px;

        >h2 {
            line-height: 16px!important;
        }

        main {
            margin-top: 18px;
            background: #08070c;
            border-radius: 12px;
            padding: 20px 30px;

            .box-top {
                height: 150px;
                @include flexCenter;

                img {
                    display: block;
                    height: 100%;
                    width: auto;
                }
            }

            .box-bottom {
                padding-top: 20px;

                p {
                    font-size: 11px;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 14px;
                }
                .btn-mint {
                    width: 140px;
                    height: 38px;
                    background: #77e1fd;
                    border-radius: 32px;
                    font-size: 17px;
                    line-height: 20px;
                    font-weight: 600;
                    color: #110f19;
                    @include flexCenter;
                    margin: 19px auto 0;
                    cursor: pointer;

                    &.small {
                        font-size: 14px;
                    }
                }

                .btn-learn-more {
                    font-size: 12px;
                    color: rgba($color: #ccc, $alpha: 0.5);
                    line-height: 24px;
                    margin-top: 14px;
                    text-align: center;
                    cursor: pointer;
                }
            }
        }
    }

    .box-specialLoot {
        margin-top: 39px;

        main {
            margin: 18px auto 0;
            background: #08070c;
            border-radius: 12px;
            padding: 34px 28px;

            .box-left {
                width: 145px;
                height: 145px;
                flex-shrink: 0;
                margin: 0 auto 24px;
            }

            .box-right {
                p {
                    font-size: 11px;
                    font-family: Myriad Pro;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 16px;
                }
                .btn-enter {
                    width: 140px;
                    height: 38px;
                    background: #77e1fd;
                    border-radius: 32px;
                    font-size: 17px;
                    line-height: 20px;
                    font-family: MyriadPro;
                    font-weight: 600;
                    color: #110f19;
                    @include flexCenter;
                    margin: 19px auto 0;
                    cursor: pointer;
                }
            }
        }
    }

    .box-ecosystem {
        margin-top: 44px;

        main {
            margin: 19px auto 0;
            position: relative;

            .btn-scroll {
                width: 26px;
                height: 26px;
                @include bg-item;
                position: absolute;
                top: 0px;
                z-index: 1;
                background-image: url(../../../assets/img/common/btn-eco-pre.png);
                background-size: auto 9px;
                background-color: #1e1c27;
                border-radius: 12px;

                &.btn-pre {
                    left: 0px;
                }

                &.btn-next {
                    right: 0px;
                    transform: rotate(180deg);
                }
            }

            .box-tab {
                height: 26px;
                background: #1e1c27;
                border-radius: 35px;
                @include flex;
                padding: 0 30px;
                overflow-x: auto;
                position: relative;

                .box-tab-item {
                    font-size: 10px;
                    line-height: 14px;
                    font-weight: 600;
                    flex-shrink: 0;
                    color: #fefefe;
                    height: 100%;
                    @include flexCenter;
                    cursor: pointer;
                    transition: all 0.3s;

                    &:not(:last-child) {
                        margin-right: 10px;
                    }

                    &.cur {
                        background: #77e1fd;
                        border-radius: 35px;
                        padding: 0 13px;
                    }
                }
            }

            .box-content {
                height: 189px;
                background: #08070c;
                border-radius: 12px;
                margin-top: 12px;
                padding: 22px 17px;

                img {
                    display: block;
                    height: 100%;
                    width: 100%;
                }

                &.box-eco-type-1 {
                    @include flex;
                    padding: 14px 18px;

                    .box-left {
                        width: 120px;
                        margin-right: 12px;
                        flex-shrink: 0;

                        video {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .box-right {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        color: #fff;

                        h2 {
                            line-height: 18px;
                            font-size: 14px;
                        }
                        p {
                            line-height: 16px;
                            font-size: 10px;
                            margin-top: 9px;
                        }
                    }
                }

                &.box-eco-type-2 {
                    @include flex;
                    padding: 18px 24px;

                    .box-left {
                        width: 108px;
                        margin-right: 12px;
                        flex-shrink: 0;
                    }

                    .box-right {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        color: #fff;

                        h2 {
                            line-height: 18px;
                            font-size: 14px;
                        }
                        p {
                            line-height: 16px;
                            font-size: 10px;
                            margin-top: 10px;
                        }
                    }
                }

                &.box-eco-type-3 {
                    img {
                        height: auto;
                    }
                }

                &.box-eco-tab-2 {
                    @include flex;
                    padding: 0 24px;
                }
                &.box-eco-tab-3 {
                    @include flex;
                    padding: 0 20px;
                }
                &.box-eco-tab-4 {
                    padding: 14px;

                    .box-left {
                        width: 120px;
                        margin-right: 14px;
                    }

                    .box-right {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 5;
                        overflow: hidden;
                    }
                }
            }
        }
    }

    .box-memorialNFT {
        margin-top: 46px;

        .box-airdrop {
            font-size: 11px;
            line-height: 20px;
            margin-top: 13px;
            display: flex;
            color: #3e3e47;

            h3 {
                font-weight: normal;
                flex-shrink: 0;
                margin-right: 6px;
            }

            > div {
                flex-wrap: wrap;

                span {
                    flex-shrink: 0;
                    &:not(:last-child) {
                        margin-right: 4px;
                    }

                    &.color1 {
                        color: #e7173e;
                    }
                    &.color2 {
                        color: #d8c62a;
                    }
                    &.color3 {
                        color: #ed6318;
                    }
                    &.color4 {
                        color: #bf1dee;
                    }
                    &.color5 {
                        color: #1b99e8;
                    }
                    &.color6 {
                        color: #30c76c;
                    }
                    &.color7 {
                        color: #cdcfe7;
                    }
                    &.color8 {
                        color: #e7173e;
                    }

                    i {
                        font-style: normal;
                    }
                }
            }
        }

        main {
            margin-top: 23px;

            img {
                display: block;
                height: 100%;
                width: auto;
            }

            .box-big {
                height: 205px;
                @include flexCenter;
            }

            .box-small {
                height: 40px;
                width: auto;
                margin: 17px auto 0;
                @include flexCenter;
            }
        }
    }

    .box-partners {
        margin-top: 50px;

        main {
            margin-top: 20px;
            padding-left: 10px;
            display: flex;
            flex-wrap: wrap;

            .box-partner-item {
                width: 86px;
                height: 20px;
                transition: all 0.3s;
                @include flexCenter;
                cursor: pointer;
                margin-bottom: 18px;

                &:not(:nth-child(3n)) {
                    margin-right: 30px;
                }

                img {
                    display: block;
                    width: 86px;
                    height: auto;

                    &.img-1 {
                        width: 40px;
                    }
                    &.img-3 {
                        width: 46px;
                    }
                    &.img-5 {
                        width: 58px;
                    }
                    &.img-6 {
                        width: 44px;
                    }
                    &.img-7 {
                        width: 69px;
                    }
                }
            }
        }
    }

    .box-community {
        margin-top: 32px;

        main {
            margin-top: 19px;
            padding-left: 10px;
            @include flex;
            flex-wrap: wrap;

            .box-community-item {
                width: 100px;
                height: 125px;
                margin-bottom: 16px;
                @include flexCenter;
                @include bg-item;
                background-image: url(../../../assets/img/home/bg-community-item.png);
                flex-direction: column;
                flex-shrink: 0;

                &:not(:last-child) {
                    margin-right: 10px;
                }

                img {
                    width: 38px;
                    height: 38px;
                }

                h4 {
                    font-size: 10px;
                    line-height: 12px;
                    font-weight: 400;
                    color: #ffffff;
                    margin-top: 6px;
                }

                .btn-join {
                    width: 65px;
                    height: 20px;
                    background: #77e1fd;
                    border-radius: 18px;
                    margin-top: 12px;
                    font-size: 10px;
                    line-height: 14px;
                    font-weight: 600;
                    color: #110f19;
                    cursor: pointer;
                    @include flexCenter;
                }
            }
        }
    }

    .box-footer {
        margin-top: 30px;

        .box-bottom {
            @include flexCenter;
            flex-direction: column;

            .box-logo {
                height: 18px;
                width: 80px;
                @include bg-item;
                background-image: url(../../../assets/img/common/img-logo-world.png);
            }

            .box-copyright {
                font-size: 12px;
                line-height: 10px;
                color: #3e3e47;
                margin-top: 17px;
            }
        }

        .box-top {
            @include flexBetween;
            padding-left: 10px;
        }

        .box-mid {
            display: flex;
            flex-wrap: wrap;
            width: 160px;
            flex-shrink: 0;

            .box-menu-item {
                width: 80px;
                line-height: 20px;
                height: 26px;
                font-size: 14px;
                @include flex;
                font-weight: 400;
                color: #ffffff;
                margin-bottom: 28px;
                cursor: pointer;
            }
        }

        .box-right {
            width: 150px;
            flex-shrink: 0;
            margin-top: -20px;

            h2 {
                line-height: 15px;
                font-size: 14px;
            }
            h3 {
                line-height: 13px;
                font-size: 10px;
                color: #5c5d67;
                margin-top: 8px;
                display: none;
            }
            .box-subscribe {
                margin-top: 8px;

                .box-input {
                    padding: 0 12px;
                    background: #1e1c27;
                    border-radius: 30px;

                    input {
                        background-color: transparent;
                        font-size: 12px;
                        font-family: MyriadPro;
                        font-weight: 600;
                        color: #585861;
                        border: none;
                        width: 100%;
                        height: 30px;
                    }
                }

                .btn-sub {
                    @include btn-common;
                    width: 120px;
                    height: 30px;
                    font-size: 14px;
                    margin-top: 10px;
                }
            }
        }
    }
}
.box-email-tip {
    font-size: 12px;
    line-height: 16px;
    height: 32px;
    font-weight: bold;
    color: #fff;
    padding-left: 4px;
    margin-top: 4px;

    &.error {
        color: #f00;
    }
}
</style>
