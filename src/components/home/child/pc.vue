<template>
    <div class="container-home container-pc">
        <!-- Banner -->
        <div class="box-banner flexCenter">
            <img :src="bannerImg" />
        </div>

        <section class="flex">
            <div>
                <!-- Introduction -->
                <div class="box-section-common">
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
                                        <img :src="item.img" alt="">
                                    </div>
                                    <div class="box-content flexBetween">
                                        <h3 v-text="item.title"></h3>
                                        <div class="btn-go" @click="handleGoIntroductDetail(item)">Go</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 如果需要导航按钮 -->
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>
                </div>

                <!-- Special Loot Box -->
                <div class="box-section-common box-specialLoot">
                    <h1>Special Loot Box</h1>
                    <h2>Your Own Private NFTs from Loot Box</h2>
                    <main>
                        <div class="box-left">
                            <img class="img-block" :src="lootBoxImg">
                        </div>
                        <div class="box-right">
                            <p>Our experience tells us, "Luck is also a part of success. You never know what will happen next second." Although the unknown is big, we bring you a different Loot Box experience. It only costs $250. You can play between 400% and 90%, which sounds exciting. And you can also get a unique commemorative NFT, which belongs to you only. </p>
                            <div class="btn-enter">Enter</div>
                        </div>
                    </main>
                </div>

                <!-- Ecosystem -->
                <div class="box-section-common box-ecosystem">
                    <h1>Ecosystem</h1>
                    <h2>We are creating Metaverse and linking different SubVerse</h2>
                    <main>
                        <div class="box-tab">
                            <div 
                                v-for="(item, index) in ecoTabList" 
                                :key="item.id"
                                class="box-tab-item"
                                :class="{'cur': index === cueEcoIdx}"
                                @click="selectEcoTab(index)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="box-content">
                            <img :src="ecoTabList[cueEcoIdx].content" alt="">
                        </div>
                    </main>
                </div>

                <!-- Memorial NFT -->
                <div class="box-section-common box-memorialNFT">
                    <h1>Memorial NFT</h1>
                    <h2>Dream Card has a total release of 10,000 cards on Kusama</h2>
                    <div class="box-airdrop">
                        <h3>Airdrop: </h3>
                        <div class="flex">
                            <span class="color1">A Reward=20000 IIC<i>,</i></span>
                            <span class="color2">B Reward=15000 IIC<i>,</i></span>
                            <span class="color3">C Reward=12500 IIC<i>,</i></span>
                            <span class="color4">D Reward=10000 IIC<i>,</i></span>
                            <span class="color5">E Reward=5500 IIC<i>,</i></span>
                            <span class="color6">F Reward=5000 IIC<i>,</i></span>
                            <span class="color7">G Reward=4500 IIC<i>,</i></span>
                            <span class="color8">Last Reward=20000 IIC<i>.</i></span>
                        </div>
                    </div>
                    <main>
                        <div class="box-big">
                            <img :src="memorialNftImg.big">
                        </div>
                        <div class="box-small">
                            <img :src="memorialNftImg.small">
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
                            <img :src="item" :class="'img-' + index">
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
                            <img :src="item.icon" alt="">
                            <h4 v-text="item.title"></h4>
                            <div class="btn-join">Join us</div>
                        </div>
                    </main>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Base from './base';

export default {
    mixins: [ Base ],
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
        return {
            
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {},
    //请求数据
    created() {},
    mounted() {
        var mySwiper = new Swiper(".swiper-container", {
            loop: true, // 循环模式选项
            autoplay: {
                delay: 5000,
            },
            slidesPerView: 3,
            spaceBetween: 22,

            // 如果需要前进后退按钮
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        });
    }
};
</script>

<style scoped lang="scss">
.box-swiper {
    width: 100%;
    position: relative;

    .swiper-container {
        width: calc(100% - 124px);
        height: 340px;
        margin-top: 58px;
    }
    .swiper-slide {
        width: 410px;
        height: 332px;
        color: #000;
        border-radius: 10px;
        overflow: hidden;

        .box-img {
            height: 250px;

            img {
                display: block;
                height: 100%;
            }
        }

        .box-content {
            height: 82px;
            background: #161722;
            padding: 0 14px 0 16px;
            font-size: 20px;
            line-height: 24px;
            
            h3 {
                font-size: 20px;
                color: #fff;
            }

            .btn-go {
                font-weight: 400;
                color: #77E1FD;
                padding-right: 16px;
                cursor: pointer;
                background: url(../../../assets/img/home/icon-arrow-right.png) no-repeat right center / auto 16.5px;
            }
        }
    }
    .swiper-button-next, .swiper-button-prev {
        width: 48px;
        height: 48px;
        background: url(../../../assets/img/home/img-swiper-btn.png) no-repeat center / 100% 100%;
        cursor: pointer;

        &::after {
            display: none;
        }
    }
    .swiper-button-next {
        right: 0;
        transform: rotate(180deg);
    }
    .swiper-button-prev {
        left: 0;
    }
}
.container-pc {
    padding-bottom: 150px;
}
.container-home {
    .box-banner {
        height: 500px;

        img {
            display: block;
            height: 100%;
            width: 1920px;
        }
    }

    > section {
        flex-direction: column;
        padding-top: 124px;

        > div {
            width: 1400px;
        }

        .box-section-common {
            position: relative;

            > h1 {
                font-size: 52px;
                line-height: 40px;
            }

            > h2 {
                line-height: 20px;
                font-size: 26px;
                font-weight: 400;
                color: #3e3e47;
                margin-top: 21px;
            }
        }
    }

    .box-specialLoot {
        margin-top: 136px;

        main {
            margin: 51px auto 0;
            width: 1230px;
            height: 416px;
            background: #08070C;
            border-radius: 12px;
            @include flex;
            padding-left: 85px;
            padding-right: 80px;

            .box-left {
                width: 300px;
                height: 300px;
                flex-shrink: 0;
                margin-right: 75px;
            }

            .box-right {
                p {
                    font-size: 20px;
                    font-family: Myriad Pro;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 32px;
                    letter-spacing: -1px;
                }
                .btn-enter {
                    width: 230px;
                    height: 64px;
                    background: #77E1FD;
                    border-radius: 32px;
                    font-size: 28px;
                    font-family: MyriadPro;
                    font-weight: 600;
                    color: #110F19;
                    @include flexCenter;
                    margin-top: 24px;
                    cursor: pointer;
                }
            }
        }
    }

    .box-ecosystem {
        margin-top: 134px;

        main {
            margin: 56px auto 0;
            width: 1014px;

            .box-tab{
                height: 70px;
                background: #1E1C27;
                border-radius: 35px;
                @include flexBetween;
                padding: 0 30px;
            
                .box-tab-item {
                    font-size: 22px;
                    line-height: 24px;
                    font-weight: 600;
                    color: #FEFEFE;
                    height: 100%;
                    @include flexCenter;
                    cursor: pointer;
                    transition: all .3s;

                    &.cur {
                        background: #77E1FD;
                        border-radius: 35px;
                        padding: 0 35px;
                    }
                }
            }

            .box-content {
                height: 528px;
                background: #08070C;
                border-radius: 12px;
                margin-top: 28px;
                padding: 45px 50px;

                img {
                    display: block;
                    height: 100%;
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
            color: #3E3E47;
            width: 1050px;
            letter-spacing: -1.5px;

            h3 {
                font-weight: normal;
                flex-shrink: 0;
                margin-right: 6px;
            }

            >div {
                flex-wrap: wrap;

                span {
                    flex-shrink: 0;
                    &:not(:last-child) {
                        margin-right: 4px;
                    }
                    
                    &.color1 { color: #E7173E; }
                    &.color2 { color: #D8C62A; }
                    &.color3 { color: #ED6318; }
                    &.color4 { color: #BF1DEE; }
                    &.color5 { color: #1B99E8; }
                    &.color6 { color: #30C76C; }
                    &.color7 { color: #CDCFE7; }
                    &.color8 { color: #E7173E; }

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
        margin-top: 184px;

        main {
            margin-top: 49px;
            padding-left: 200px;
            width: 1300px;
            display: flex;
            flex-wrap: wrap;

            .box-partner-item {
                width: 243px;
                height: 66px;
                border-radius: 8px;
                transition: all .3s;
                @include flexCenter;
                cursor: pointer;

                &:hover {
                    background: #1E1C27;
                }

                &:nth-child(-n+4) {
                    margin-bottom: 20px;
                }

                &:not(:nth-child(4n)) {
                    margin-right: 26px;
                }

                img {
                    display: block;
                    width: 170px;
                    height: auto;

                    &.img-1 { width: 157px; }
                    &.img-5 { width: 136px; }
                    &.img-6 { width: 87px; }
                }
            }
        }
    }

    .box-community {
        margin-top: 120px;

        main {
            margin-top: 52px;
            padding-left: 230px;
            @include flex;

            .box-community-item {
                width: 280px;
                height: 290px;
                border-radius: 12px;
                margin-right: 52px;
                @include flexCenter;
                @include bg-item;
                background-image: url(../../../assets/img/home/bg-community-item.png);
                flex-direction: column;

                img {
                    width: 76px;
                    height: 76px;
                }

                h4 {
                    font-size: 18px;
                    line-height: 20px;
                    font-weight: 400;
                    color: #FFFFFF;
                    margin-top: 10px;
                }

                .btn-join {
                    width: 120px;
                    height: 36px;
                    background: #77E1FD;
                    border-radius: 18px;
                    margin-top: 28px;
                    font-size: 18px;
                    line-height: 24px;
                    font-weight: 600;
                    color: #110F19;
                    cursor: pointer;
                    @include flexCenter;
                }
            }
        }
    }
}
</style>
