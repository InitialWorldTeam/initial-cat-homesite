<template>
    <div class="container-home container-common-pc " :class="pageType">
        <section class="flex">
            <!-- Banner -->
            <div class="box-banner flexCenter swiper-banner">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="item in bannerList"
                        :key="item.id"
                    >
                        <img
                            :src="item.img"
                            class="box-img"
                            @click="goToBanner(item)"
                        />
                        <img
                            v-if="item.text"
                            :src="item.text"
                            class="box-text"
                        />
                    </div>
                </div>
            </div>

            <div class="box-main">
                <!-- Introduction -->
                <div class="box-section-common animate__animated">
                    <h1>Introduction</h1>
                    <!-- Swiper -->
                    <div class="box-swiper">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
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
                                        <div class="btn-go" @click="handleGoIntroductDetail(item)">
                                            Go
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 如果需要导航按钮 -->
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>
                </div>

                <!-- Mint Avatar -->
                <div
                    class="box-section-common box-mintAvatar animate__animated "
                >
                    <h1>Free to mint your InitialWorld Avatar</h1>
                    <h2>You only pay the Kusama Gas Fee.</h2>
                    <main>
                        <div class="box-left">
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
                        <div class="box-right">
                            <img
                                :src="require('../img/img-mint-cat.png').default"
                                class="img-block"
                            />
                        </div>
                    </main>
                </div>

                <!-- Mystery Box -->
                <div
                    class="box-section-common box-specialLoot animate__animated"
                >
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
                            <el-tooltip
                                effect="dark"
                                content="Coming soon"
                                placement="bottom"
                                popper-class="popper-coming"
                            >
                                <div class="btn-enter">Coming soon</div>
                            </el-tooltip>
                        </div>
                    </main>
                </div>

                <!-- Ecosystem -->
                <div class="box-section-common box-ecosystem animate__animated">
                    <h1>Ecosystem</h1>
                    <h2>
                        We are creating Metaverse and linking different
                        SubMetaverse
                    </h2>
                    <main>
                        <div class="box-tab">
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
                <div class="box-section-common box-partners animate__animated">
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
                <div class="box-section-common box-community animate__animated">
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
                                <div
                                    class="btn-join"
                                    @click="handleJoinCommunity(item)"
                                >
                                    Join us
                                </div>
                            </el-tooltip>
                        </div>
                    </main>
                </div>

                <!-- Footer -->
                <footer class="box-footer">
                    <div class="box-left">
                        <div class="box-logo"></div>
                        <div class="box-copyright">
                            @InitialWorld Team. 2021
                        </div>
                    </div>
                    <div class="box-mid">
                        <template v-for="(item, index) in navList">
                            <div
                                v-if="item.path"
                                class="box-menu-item"
                                :class="{ cur: curNav === item.name }"
                                :key="item.name"
                                v-text="item.name"
                                @click="goToNav(item, index)"
                            ></div>
                            <div class="box-menu-item" :key="item.name" v-else>
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
                        </div>
                        <transition name="fade">
                            <div
                                class="box-email-tip"
                                :class="{ error: !checkEmailPass }"
                                v-if="checkEmailTip"
                                v-text="checkEmailTip"
                            ></div>
                        </transition>
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
    watch: {
        pageType(val) {
            if (val === "normal") {
                this.initSwiper();
            } else {
                this.initSwiperSmall();
            }
        }
    },
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {},
    //数据
    data() {
        return {
            mySwiper: null,
            pageType: ""
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        initSwiper() {
            this.mySwiper && this.mySwiper.destroy(false);
            this.mySwiper = new Swiper(".swiper-container", {
                loop: true, // 循环模式选项
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay
                },
                slidesPerView: 4,
                spaceBetween: 20

                // 如果需要前进后退按钮
                /* navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                } */
            });
        },
        initSwiperSmall() {
            this.mySwiper && this.mySwiper.destroy(false);
            this.mySwiper = new Swiper(".swiper-container", {
                loop: true, // 循环模式选项
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay
                },
                slidesPerView: 3,
                spaceBetween: 20
            });
        },
        getPageType() {
            let width = window.innerWidth;
            this.pageType = width >= 1200 ? "normal" : "small";
        },
        onScroll() {
            const win_h = window.innerHeight;
            const scroll_top =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;

            $(".animate__animated").each(function(i) {
                if (!$(this).hasClass("animate__fadeInUp")) {
                    const top =
                        $(this).offset().top + $(".box-banner").height() - 300;
                    if (win_h + scroll_top >= top) {
                        $(this).addClass("animate__fadeInUp");
                    }
                }
            });
        }
    },
    //请求数据
    created() {},
    mounted() {
        this.getPageType();
        window.addEventListener("resize", () => {
            this.getPageType();
        });

        window.addEventListener("scroll", this.onScroll);
        let timer = setTimeout(() => {
            this.onScroll();
            clearTimeout(timer);
        }, 200);
    }
};
</script>

<style scoped lang="scss">
.box-swiper {
    width: 100%;
    position: relative;
    margin-top: 29px;

    .swiper-container {
        // width: calc(100% - 124px);
        min-height: 206px;
    }
    .swiper-slide {
        width: 240px;
        height: 100%;
        color: #000;
        border-radius: 10px;
        overflow: hidden;

        .box-img {
            min-height: 146px;
            max-height: 190px;
            overflow: hidden;
            background-color: #fff;

            img {
                display: block;
                min-height: 146px;
                height: auto;
                width: 100%;
            }
        }

        .box-content {
            height: 60px;
            background: #161722;
            padding: 0 10px;
            font-size: 14px;
            line-height: 18px;

            h3 {
                font-size: 14px;
                color: #fff;
                // @include ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }

            .btn-go {
                font-weight: 400;
                color: #77e1fd;
                padding-right: 16px;
                cursor: pointer;
                background: url(../../../assets/img/home/icon-arrow-right.png)
                    no-repeat right center / auto 16.5px;
                margin-left: 10px;
            }
        }
    }
    .swiper-button-next,
    .swiper-button-prev {
        width: 30px;
        height: 30px;
        background: url(../../../assets/img/home/img-swiper-btn.png) no-repeat
            center / 100% 100%;
        cursor: pointer;

        &::after {
            display: none;
        }
    }
    .swiper-button-next {
        right: -54px;
        transform: rotate(180deg);
    }
    .swiper-button-prev {
        left: -54px;
    }
}
.container-common-pc {
    padding-bottom: 150px;
}
.container-home {
    &.small {
        .swiper-button-next,
        .swiper-button-prev {
            display: none;
        }
        .box-mintAvatar main {
            padding: 0 30px;
        }
        .box-ecosystem main {
            .box-tab {
                .box-tab-item {
                    font-size: 12px;
                }
            }
            .box-content {
                &.box-eco-tab-0 {
                    padding: 48px 30px;
                }
                &.box-eco-tab-1 {
                    padding: 25px 30px;
                }
                &.box-eco-tab-2 {
                    padding: 30px;
                }
                &.box-eco-type-3 {
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
                &.box-eco-tab-4 {
                    padding: 30px;

                    .box-left {
                        width: 350px;
                        height: 180px;
                    }
                    .box-right {
                        p {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
        .box-footer {
            justify-content: space-between;

            .box-right {
                margin-left: 0;
            }

            .box-mid {
                margin-left: 16px;
            }
        }
    }

    > section {
        flex-direction: column;

        .box-banner {
            height: auto;
            max-height: 450px;
            min-height: 255px;
            width: 100%;
            margin-bottom: 56px;
            overflow: hidden;
            position: relative;
            @extend .common-pc-width;

            .box-img {
                display: block;
                height: 100%;
                width: 100%;
                object-fit: cover;
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

        .box-main {
            @extend .common-pc-width;
        }

        .box-section-common {
            position: relative;

            > h1 {
                font-size: 34px;
                line-height: 34px;
            }

            > h2 {
                line-height: 18px;
                font-size: 18px;
                font-weight: 400;
                color: #3e3e47;
                margin-top: 12px;
            }
        }
    }

    .box-mintAvatar {
        margin-top: 87px;

        main {
            margin-top: 32px;
            height: 366px;
            background: #08070c;
            border-radius: 12px;
            @include flexBetween;
            padding-left: 97px;
            padding-right: 60px;

            .box-right {
                width: 320px;
                height: 320px;
                flex-shrink: 0;
                border-radius: 10px;
                overflow: hidden;

                video {
                    width: 100%;
                    height: auto;
                    display: block;
                }
            }

            .box-left {
                width: calc(100% - 350px);
                padding-top: 7px;

                p {
                    font-size: 16px;
                    font-family: Myriad Pro;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 28px;
                }
                .btn-mint {
                    width: 180px;
                    height: 50px;
                    background: #77e1fd;
                    border-radius: 32px;
                    font-size: 22px;
                    font-family: MyriadPro;
                    font-weight: 600;
                    color: #110f19;
                    @include flexCenter;
                    margin-top: 30px;
                    cursor: pointer;

                    &.small {
                        font-size: 16px;
                    }
                }
                .btn-learn-more {
                    font-size: 12px;
                    color: rgba($color: #ccc, $alpha: 0.5);
                    line-height: 24px;
                    margin-top: 14px;
                    width: 80px;
                    text-align: center;
                    cursor: pointer;
                    margin-left: 40px;

                    &:hover {
                        color: #fff;
                    }
                }
            }
        }
    }

    .box-specialLoot {
        margin-top: 88px;

        main {
            margin: 30px auto 0;
            height: 356px;
            background: #08070c;
            border-radius: 12px;
            @include flex;
            padding-left: 70px;
            padding-right: 70px;

            .box-left {
                width: 250px;
                height: 250px;
                flex-shrink: 0;
                margin-right: 75px;
            }

            .box-right {
                p {
                    font-size: 18px;
                    font-family: Myriad Pro;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 28px;
                }
                .btn-enter {
                    width: 180px;
                    height: 50px;
                    background: #77e1fd;
                    border-radius: 32px;
                    font-size: 22px;
                    font-family: MyriadPro;
                    font-weight: 600;
                    color: #110f19;
                    @include flexCenter;
                    margin-top: 44px;
                    cursor: pointer;
                }
            }
        }
    }

    .box-ecosystem {
        margin-top: 87px;

        main {
            margin: 34px auto 0;

            .box-tab {
                height: 56px;
                background: #1e1c27;
                border-radius: 35px;
                padding: 0 34px;
                @include flexBetween;

                .box-tab-item {
                    padding: 0 30px;
                    font-size: 18px;
                    line-height: 24px;
                    font-weight: 600;
                    color: #fefefe;
                    height: 100%;
                    @include flexCenter;
                    cursor: pointer;
                    transition: all 0.3s;

                    &.cur {
                        background: #77e1fd;
                        border-radius: 35px;
                        padding: 0 32px;
                        color: #110f19;
                    }
                }
            }

            .box-content {
                height: 430px;
                background: #08070c;
                border-radius: 12px;
                margin-top: 13px;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }

                &.box-eco-type-1 {
                    @include flex;
                    padding: 34px 108px 34px 133px;

                    .box-left {
                        width: 290px;
                        height: 362px;
                        margin-right: 92px;
                        flex-shrink: 0;
                        border-radius: 10px;
                        overflow: hidden;

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
                            line-height: 17px;
                            font-size: 24px;
                        }
                        p {
                            line-height: 28px;
                            font-size: 18px;
                            margin-top: 56px;
                        }
                    }
                }

                &.box-eco-type-2 {
                    @include flex;
                    padding: 58px 114px;

                    .box-left {
                        width: 298px;
                        height: 313px;
                        margin-right: 93px;
                        flex-shrink: 0;
                        border-radius: 10px;
                        overflow: hidden;
                        display: flex;
                        align-items: center;

                        img {
                            height: auto;
                        }
                    }

                    .box-right {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        color: #fff;

                        h2 {
                            line-height: 17px;
                            font-size: 24px;
                        }
                        p {
                            line-height: 28px;
                            font-size: 18px;
                            margin-top: 56px;
                        }
                    }
                }

                &.box-eco-type-3 {
                    @include flexCenter;
                    img {
                        height: 100%;
                        width: auto;
                    }
                }

                &.box-eco-tab-2 {
                    padding: 48px 90px 60px 93px;
                }
                &.box-eco-tab-3 {
                    padding: 30px 45px 40px 40px;
                }
                &.box-eco-tab-4 {
                    padding: 70px 79px 67px 70px;

                    .box-left {
                        width: 477px;
                        height: 226px;
                        margin-right: 79px;
                    }
                }
            }
        }
    }

    .box-memorialNFT {
        margin-top: 144px;

        .box-airdrop {
            font-size: 26px;
            line-height: 40px;
            margin-top: 23px;
            display: flex;
            color: #3e3e47;
            width: 1050px;

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
            padding-left: 80px;
            margin-top: 68px;

            img {
                display: block;
                height: 100%;
                width: auto;
            }

            .box-big {
                height: 384px;
            }

            .box-small {
                height: 80px;
                width: 1244px;
                margin-top: 26px;
                @include flexCenter;
            }
        }
    }

    .box-partners {
        margin-top: 87px;

        main {
            margin-top: 43px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            .box-partner-item {
                width: 20%;
                height: 66px;
                border-radius: 8px;
                transition: all 0.3s;
                @include flexCenter;
                cursor: pointer;

                &:hover {
                    background: #1e1c27;
                }

                &:nth-child(-n + 4) {
                    margin-bottom: 20px;
                }

                &:not(:nth-child(4n)) {
                    margin-right: 26px;
                }

                img {
                    display: block;
                    width: 149px;
                    height: auto;

                    &.img-1 {
                        width: 81px;
                    }
                    &.img-3 {
                        width: 111px;
                    }
                    &.img-5 {
                        width: 90px;
                    }
                    &.img-6 {
                        width: 90px;
                    }
                    &.img-7 {
                        width: 119px;
                    }
                }
            }
        }
    }

    .box-community {
        margin-top: 110px;

        main {
            margin-top: 44px;
            padding-left: 40px;
            @include flexCenter;

            .box-community-item {
                width: 200px;
                height: 220px;
                @include flexCenter;
                @include bg-item;
                background-image: url(../../../assets/img/home/bg-community-item.png);
                flex-direction: column;

                &:not(:last-child) {
                    margin-right: 66px;
                }

                img {
                    width: 61px;
                    height: 61px;
                }

                h4 {
                    font-size: 15px;
                    line-height: 10px;
                    font-weight: 400;
                    color: #ffffff;
                    margin-top: 8px;
                }

                .btn-join {
                    width: 98px;
                    height: 29px;
                    background: #77e1fd;
                    border-radius: 18px;
                    margin-top: 23px;
                    font-size: 15px;
                    line-height: 20px;
                    font-weight: 600;
                    color: #110f19;
                    cursor: pointer;
                    @include flexCenter;
                }
            }
        }
    }

    .box-footer {
        margin-top: 167px;
        display: flex;
        justify-content: space-between;

        .box-left {
            .box-logo {
                height: 33px;
                width: 145px;
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

        .box-mid {
            margin-left: 108px;
            display: flex;
            flex-wrap: wrap;
            width: 200px;

            .box-menu-item {
                width: 100px;
                line-height: 20px;
                height: 26px;
                font-size: 16px;
                @include flex;
                font-weight: 400;
                color: #ffffff;
                margin-bottom: 28px;
                cursor: pointer;
            }
        }

        .box-right {
            margin-left: 150px;
            width: 390px;

            h2 {
                line-height: 15px;
                font-size: 20px;
            }
            h3 {
                line-height: 13px;
                font-size: 14px;
                color: #5c5d67;
                margin-top: 14px;
            }
            .box-subscribe {
                width: 390px;
                height: 54px;
                background: #1e1c27;
                border-radius: 30px;
                margin-top: 19px;
                @include flexBetween;

                .box-input {
                    padding-left: 23px;

                    input {
                        background-color: transparent;
                        font-size: 16px;
                        font-family: MyriadPro;
                        font-weight: 600;
                        color: #585861;
                        border: none;
                        width: 200px;
                        height: 40px;
                    }
                }

                .btn-sub {
                    @include btn-common;
                    width: 120px;
                    height: 54px;
                    font-size: 16px;
                }
            }
        }
    }
}
.box-email-tip {
    font-size: 12px;
    line-height: 30px;
    font-weight: bold;
    color: #fff;
    padding-left: 14px;

    &.error {
        color: #f00;
    }
}
</style>
