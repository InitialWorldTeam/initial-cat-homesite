<template>
    <div class="container-home container-pc">
        <!-- Banner -->
        <div class="box-banner flexCenter">
            <img :src="bannerImg" />
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
                                <img :src="item.img" alt="">
                            </div>
                            <div class="box-content flexBetween">
                                <h3 v-text="item.title"></h3>
                                <div class="btn-go" @click="handleGoIntroductDetail(item)">Go</div>
                            </div>
                        </div>
                    </section>
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
                        <div class="box-tab" ref='boxEcoTab'>
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
                        <!-- 导航按钮 -->
                        <div class="btn-scroll btn-pre" @click="handleScrollX(1)"></div>
                        <div class="btn-scroll btn-next" @click="handleScrollX(2)"></div>

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
    methods: {
        handleScrollX(type) {
            const left = this.$refs.boxEcoTab.scrollLeft;
            const move = type === 1 ? -80 : 80;
            const rs = left + move;
            this.$refs.boxEcoTab.scrollTo({
                left: rs,
                behavior: "smooth"
            });
            console.log(left);
        }
    },
    //请求数据
    created() {},
    mounted() {
        
    }
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

        img {
            display: block;
            height: 100%;
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
            letter-spacing: -1px;
            display: -webkit-box;    
            -webkit-box-orient: vertical;    
            -webkit-line-clamp: 2;    
            overflow: hidden;
        }

        .btn-go {
            font-weight: 400;
            color: #77E1FD;
            padding-right: 10px;
            cursor: pointer;
            background: url(../../../assets/img/home/icon-arrow-right.png) no-repeat right center / auto 6px;
        }
    }
}
.container-pc {
    padding-bottom: 80px;
}
.container-home {
    .box-banner {
        height: 135px;
        @include flexCenter;

        img {
            display: block;
            height: 100%;
            width: auto;
        }
    }

    > section {
        flex-direction: column;
        padding: 38px 20px 0;

        .box-section-common {
            position: relative;

            > h1 {
                font-size: 23px;
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

    .box-specialLoot {
        margin-top: 39px;

        main {
            margin: 18px auto 0;
            height: 385px;
            background: #08070C;
            border-radius: 12px;
            padding: 34px 28px 0;

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
                    color: #FFFFFF;
                    line-height: 16px;
                    letter-spacing: -1px;
                }
                .btn-enter {
                    width: 140px;
                    height: 38px;
                    background: #77E1FD;
                    border-radius: 32px;
                    font-size: 17px;
                    line-height: 20px;
                    font-family: MyriadPro;
                    font-weight: 600;
                    color: #110F19;
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
                background-color: #1E1C27;
                border-radius: 12px;

                &.btn-pre {
                    left: 0px;
                }

                &.btn-next {
                    right: 0px;
                    transform: rotate(180deg);
                }
            }

            .box-tab{
                height: 26px;
                background: #1E1C27;
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
                    color: #FEFEFE;
                    height: 100%;
                    @include flexCenter;
                    cursor: pointer;
                    transition: all .3s;

                    &:not(:last-child) {
                        margin-right: 10px;
                    }

                    &.cur {
                        background: #77E1FD;
                        border-radius: 35px;
                        padding: 0 13px;
                    }
                }
            }

            .box-content {
                height: 189px;
                background: #08070C;
                border-radius: 12px;
                margin-top: 28px;
                padding: 22px 17px;

                img {
                    display: block;
                    height: 100%;
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
            color: #3E3E47;
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
                transition: all .3s;
                @include flexCenter;
                cursor: pointer;
                margin-bottom: 14px;

                &:hover {
                    // background: #1E1C27;
                }

                &:not(:nth-child(3n)) {
                    margin-right: 30px;
                }

                img {
                    display: block;
                    width: 86px;
                    height: auto;

                    &.img-1 { width: 79px; }
                    &.img-5 { width: 68px; }
                    &.img-6 { width: 44px; }
                }
            }
        }
    }

    .box-community {
        margin-top: 52px;

        main {
            margin-top: 19px;
            padding-left: 10px;
            @include flex;

            .box-community-item {
                width: 100px;
                height: 125px;
                // border-radius: 12px;
                margin-right: 8px;
                @include flexCenter;
                @include bg-item;
                background-image: url(../../../assets/img/home/bg-community-item.png);
                flex-direction: column;

                img {
                    width: 38px;
                    height: 38px;
                }

                h4 {
                    font-size: 10px;
                    line-height: 12px;
                    font-weight: 400;
                    color: #FFFFFF;
                    margin-top: 6px;
                }

                .btn-join {
                    width: 65px;
                    height: 20px;
                    background: #77E1FD;
                    border-radius: 18px;
                    margin-top: 12px;
                    font-size: 10px;
                    line-height: 14px;
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