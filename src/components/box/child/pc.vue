<template>
    <div class="container-box">
        <main>
            <!-- All Boxes -->
            <div class="container-all-cat-box">
                <div class="box-left">
                    <!-- 分页器 -->
                    <header>
                        <!-- 上一页 -->
                        <div class="btn-page-switch btn-previous" v-if="false">
                            <i></i>Previous
                        </div>

                        <!-- 数量 -->
                        <div class="box-info">
                            <div class="box-info-item" v-if="false">
                                <span>Box</span>
                                <span class="item-left">61/</span>
                                <span class="item-all">142</span>
                            </div>
                            <div class="box-info-item">
                                <span>Remaining</span>
                                <!-- <span class="item-left">39/</span> -->
                                <span class="item-all">100</span>
                            </div>
                        </div>

                        <!-- 下一页 -->
                        <div class="btn-page-switch btn-next" v-if="false">Next<i></i></div>
                    </header>
                    <!-- 列表 -->
                    <section>
                        <div
                            v-for="item in curPageCatList"
                            :key="item.id"
                            class="box-cat-item"
                            :class="{ out: item.status === 2 }"
                        >
                            <img :src="item.path" alt="" />
                            <h4 v-text="item.name"></h4>
                            <p v-text="item.text"></p>
                        </div>
                    </section>
                </div>
                <div class="box-right">
                    <h1>Special Loot Box</h1>
                    <!-- <h2>The remaining amount: 3870/9940</h2> -->
                    <h2>The remaining amount: 100</h2>
                    <div class="box-price">
                        <i></i>
                        <span>1 KSM</span>
                        <div>≈ $ {{kusamaPrice | fixed}}</div>
                    </div>
                    <div class="box-orders">
                        <h1>Equip</h1>
                        <div class="content">
                            <div class="box-order-item" @click="handleOpenRandomBox(nftTypeList.equip)">Open Box</div>
                            <div class="box-order-item" @click="handleOpenRandomSwapBox(nftTypeList.equip)">Use Swap Key</div>
                        </div>
                    </div>
                    <div class="box-orders" v-if="false">
                        <h1>Vehicle</h1>
                        <div class="content">
                            <div class="box-order-item" @click="handleOpenRandomBox(nftTypeList.vehicle)">Open Box</div>
                            <div class="box-order-item" @click="handleOpenRandomSwapBox(nftTypeList.vehicle)">Use Swap Key</div>
                        </div>
                    </div>
                    <div class="box-btns" v-if="false">
                        <div
                            class="btn-item btn-change"
                            @click="handleChangeBox"
                        >
                            Change Box
                        </div>
                        <div class="btn-item btn-all" @click="handleGetAll">
                            All
                        </div>
                    </div>
                </div>
            </div>

            <!-- About -->
            <div class="box-about">
                <h1>About Ichiban Kuji</h1>
                <section>
                    <p>
                        Like any other lottery in the world, each chapter
                        (Subverse), Ichiban Kuji is divided into multiple levels
                        of awards. From high to low, they are A Reward, B
                        Reward, C Reward, D Reward, EFG...Different topics,
                        different chapters, and the number of awards included
                        are different. Initial Cat’s Ichiban Kuji will open A
                        Reward~G Reward, each box contains 1 A Reward, 2 B
                        Reward, 2 C Reward, 1 D Reward, 20 E Reward, 21 F Reward
                        , 22 G Reward and 1 Last Reward (given when purchasing
                        the last NFT in each box), a total of 70 Reward, in
                        addition to the NFT included in A Reward~G Reward, users
                        will also receive NIC airdrops corresponding to the
                        number of Reward levels.
                    </p>
                    <p>
                        Airdrop standard: A Reward=20000 NIC, B Reward=15000
                        NIC, C Reward=12500 NIC, D Reward=10000 NIC, E
                        Reward=5500 NIC, F Reward=5000 NIC, G Reward=4500 NIC,
                        Last Reward=20000 NIC .
                    </p>
                    <p>
                        Of course, we have to say that the number of airdrops
                        for F Reward is normal, G Reward is 90%, and A Reward
                        and Last Reward are 400%.
                    </p>
                </section>
            </div>
        </main>

        <!-- Open Box Modal -->
        <van-popup
            v-model="isShowBoxModal"
            @click.stop
            class="modal-random-box"
            :close-on-click-overlay="false"
        >
            <random-box
                :way="getNftWay"
                :swap="swapType"
                @close="handleCloseBoxPop" 
                v-if="isShowBoxModal"
            ></random-box>
        </van-popup>

        <!-- Get Modal -->
        <transition name="fade">
            <div
                class="box-get-modal"
                v-if="isShowGetModal"
                @click="clearGetModal"
            >
                <main @click.stop>
                    <h1>GET !</h1>
                    <div class="box-get-list">
                        <div
                            v-for="item in catGetList"
                            :key="item.id"
                            class="box-get-item"
                        >
                            <img class="box-sell-img" :src="item.path" />
                            <h5>{{ item.name }}</h5>
                        </div>
                    </div>
                    <div class="btn-confirm" @click="confirmGetCat">OK</div>
                </main>
            </div>
        </transition>

        <!-- Change Modal -->
        <transition name="fade">
            <div
                class="box-change-modal"
                v-if="isShowChangeModal"
                @click="clearChangeModal"
            >
                <main @click.stop>
                    <h1>Choose Box</h1>
                    <div class="box-rank-page-list">
                        <div
                            class="box-rank-item"
                            :class="{ cur: curRankIdx === index }"
                            v-for="(item, index) in rankList"
                            :key="item.id"
                            v-text="item"
                            @click="selectCurRank(index)"
                        ></div>
                    </div>
                    <div class="box-rank-type">
                        <div class="box-type-item">Remaining</div>
                        <div class="box-type-item">Box number</div>
                        <div
                            class="btn-type-all"
                            :class="{ open: isShowAllBox }"
                            @click="switchAllBox"
                        >
                            All<i></i>
                        </div>
                    </div>
                    <div class="box-cat-all" v-if="isShowAllBox">
                        <div
                            v-for="item in catAllList"
                            :key="item.id"
                            class="box-all-item"
                            v-text="item.name"
                        ></div>
                    </div>

                    <section id="chooseBox">
                        <div
                            v-for="item in rewardList"
                            :key="item.id"
                            class="box-reward-item"
                            :class="{ out: item.status === 2 }"
                        >
                            <img :src="item.path" alt="" />
                            <div class="box-content">
                                <div
                                    v-for="childItem in item.list"
                                    :key="childItem.id"
                                    class="box-child-item"
                                >
                                    <span>{{ childItem.name }}</span>
                                    <p>{{ childItem.content }}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </transition>
    </div>
</template>

<script>
import Base from "./base";
import RandomBox from '@/components/randomBox';

export default {
    mixins: [Base],
    //部件
    components: {
        RandomBox
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
.container-box {
    padding-top: 120px;

    > main {
        width: 1400px;
        margin: 0 auto;
        padding-bottom: 150px;
    }

    .box-about {
        margin-top: 124px;

        h1 {
            line-height: 51px;
            font-size: 52px;
            font-weight: normal;
            color: #ffffff;
        }

        section {
            margin-top: 48px;
            padding-left: 112px;
            width: 1200px;
            box-sizing: content-box;

            p {
                font-size: 20px;
                font-weight: 400;
                color: #ffffff;
                line-height: 32px;
                letter-spacing: -1.3px;
                margin-bottom: 30px;
            }
        }
    }

    .container-all-cat-box {
        display: flex;

        .box-left {
            width: 700px;
            height: 970px;
            background: #08070c;
            border-radius: 12px;

            header {
                padding: 26px 20px 0;
                // @include flexBetween;
                @include flexCenter;

                .btn-page-switch {
                    font-size: 22px;
                    font-weight: 400;
                    color: #77e1fd;
                    letter-spacing: -1.3px;
                    display: flex;
                    align-items: center;

                    i {
                        width: 10px;
                        height: 18px;
                        @include bg-item;
                        background-image: url(../../../assets/img/common/icon-arrow-right.png);
                    }
                }
                .btn-previous {
                    i {
                        margin-right: 6px;
                        transform: rotate(180deg);
                    }
                }
                .btn-next {
                    i {
                        margin-left: 6px;
                    }
                }

                .box-info {
                    font-size: 24px;
                    line-height: 28px;
                    font-weight: 400;
                    color: #818189;
                    display: flex;

                    .box-info-item {
                        display: flex;
                        &:first-child {
                            margin-right: 24px;
                        }

                        .item-left {
                            color: #fff;
                            margin-left: 4px;
                        }
                        .item-all {
                            margin-left: 10px;
                        }
                    }
                }
            }

            section {
                padding: 36px 100px 0;
                display: flex;
                flex-wrap: wrap;

                .box-cat-item {
                    width: 142px;
                    margin-bottom: 25px;
                    text-align: center;
                    position: relative;

                    &:not(:nth-child(3n)) {
                        margin-right: 36px;
                    }

                    &.out {
                        &::before {
                            content: "";
                            width: 100%;
                            height: 213px;
                            position: absolute;
                            left: 0;
                            top: 0;
                            z-index: 1;
                            background-color: rgba(
                                $color: #000000,
                                $alpha: 0.7
                            );
                        }
                        &::after {
                            content: "Sold Out";
                            width: 110px;
                            height: 38px;
                            background: #c0182c;
                            border: 1px solid #ffffff;
                            border-radius: 30px;
                            position: absolute;
                            left: 50%;
                            top: 88px;
                            z-index: 5;
                            font-size: 20px;
                            line-height: 24px;
                            font-weight: 600;
                            color: #ffffff;
                            transform: translate(-50%, 0);
                            @include flexCenter;
                        }
                    }

                    img {
                        display: block;
                        height: 213px;
                    }

                    h4 {
                        font-size: 18px;
                        line-height: 14px;
                        font-family: Myriad Pro;
                        font-weight: 400;
                        color: #ffffff;
                        margin-top: 10px;
                    }

                    p {
                        font-size: 18px;
                        line-height: 14px;
                        font-weight: 400;
                        color: #61616b;
                        margin-top: 8px;
                    }
                }
            }
        }

        .box-right {
            padding: 130px 0 0 56px;
            h1 {
                line-height: 45px;
                font-size: 46px;
                font-weight: normal;
                color: #ffffff;
            }
            h2 {
                line-height: 24px;
                font-size: 26px;
                font-weight: 400;
                color: #818189;
                margin-top: 54px;
            }
            .box-price {
                display: flex;
                align-items: center;
                margin-top: 45px;

                i {
                    width: 40px;
                    height: 40px;
                    @include bg-item;
                    background-image: url(../../../assets/img/common/img-logo-ksm.png);
                    margin-right: 9px;
                }
                span {
                    line-height: 40px;
                    font-size: 38px;
                    font-weight: 400;
                    color: #fefeff;
                    margin-right: 16px;
                }
                div {
                    font-size: 26px;
                    line-height: 30px;
                    font-weight: 400;
                    color: #818189;
                }
            }

            .box-orders {
                margin-top: 60px;
                
                h1 {
                    font-size: 40px;
                    line-height: 50px;
                }

                .content {
                    display: flex;
                    margin-top: 12px;
                }

                .box-order-item {
                    @include btn-common;
                    margin-right: 16px;
                    padding: 0 29px;
                    font-size: 20px;
                    font-weight: 600;
                    color: #110f19;
                    letter-spacing: -1.3px;
                    height: 54px;
                    min-width: 200px;
                }
            }

            .box-btns {
                margin-top: 52px;
                display: flex;

                .btn-item {
                    width: 298px;
                    height: 82px;
                    border-radius: 41px;
                    @include flexCenter;
                    cursor: pointer;
                }

                .btn-all {
                    background: #fdd55a;
                    font-size: 36px;
                    font-weight: 600;
                    color: #110f19;
                    line-height: 40px;
                }

                .btn-change {
                    border: 2px solid #fdd55a;
                    font-size: 28px;
                    font-weight: 400;
                    color: #fdd55a;
                    margin-right: 13px;
                }
            }
        }
    }
}
.box-get-modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: rgba($color: #000000, $alpha: 0.5);
    @include flexCenter;

    main {
        width: 1000px;
        min-height: 570px;
        max-height: 90vh;
        height: auto;
        background: #110f19;
        border-radius: 12px;
        padding: 47px 70px 65px;
        @include flex;
        flex-direction: column;

        h1 {
            font-size: 32px;
            line-height: 24px;
            font-weight: normal;
            color: #ffffff;
        }

        .box-get-list {
            display: flex;
            justify-content: center;
            margin-top: 58px;
            width: 100%;
            flex-wrap: wrap;
            max-height: calc(100% - 100px);
            overflow-y: auto;

            .box-get-item {
                width: 142px;
                flex-shrink: 0;
                margin-bottom: 36px;
                margin-right: 44px;

                img {
                    display: block;
                    height: 213px;
                }
                h5 {
                    line-height: 13px;
                    font-size: 18px;
                    font-weight: 400;
                    color: #ffffff;
                    margin-top: 13px;
                }
            }
        }

        .btn-confirm {
            @include btn-common;
            width: 196px;
            height: 54px;
            background: #77e1fd;
            font-size: 24px;
            font-weight: 600;
            margin-top: 84px;
            flex-shrink: 0;
        }
    }
}
.box-change-modal {
    @extend .modal-common;

    main {
        padding: 30px 30px 0 40px;

        h1 {
            line-height: 24px;
            font-size: 32px;
            font-weight: normal;
            color: #ffffff;
        }

        .box-rank-page-list {
            margin-top: 20px;
            display: flex;

            .box-rank-item {
                margin-right: 10px;
                width: 116px;
                height: 40px;
                background: #2d2a38;
                border-radius: 20px;
                @include flexCenter;
                font-size: 20px;
                line-height: 24px;
                font-weight: 400;
                color: #818189;
                letter-spacing: -1px;
                cursor: pointer;

                &.cur {
                    background: #2d2a38;
                    border: 2px solid #fdd55a;
                    color: #fdd55a;
                }
            }
        }

        .box-rank-type {
            margin-top: 24px;
            display: flex;
            align-items: center;
            height: 18px;
            font-size: 20px;
            line-height: 18px;
            font-weight: 400;
            color: #ffffff;

            .btn-type-all {
                display: flex;
                cursor: pointer;

                i {
                    background: url(../../../assets/img/common/icon-arrow-down.png)
                        no-repeat right center / 16px auto;
                    width: 16px;
                    height: 16px;
                    transform: rotate(180deg);
                    transition: all 0.2s;
                    margin-left: 9px;
                }

                &.open {
                    i {
                        transform: rotate(0deg);
                    }
                }
            }

            .box-type-item {
                padding-right: 25px;
                background: url(../../../assets/img/common/icon-sort.png)
                    no-repeat right center / 18px auto;
                cursor: pointer;
                margin-right: 32px;

                &:hover {
                    color: #fdd55a;
                    background-image: url(../../../assets/img/common/icon-sort-cur.png);
                }
            }
        }

        .box-cat-all {
            display: flex;
            align-items: center;
            height: 20px;
            font-size: 20px;
            line-height: 20px;
            font-weight: 400;
            color: #ffffff;
            letter-spacing: -1.5px;
            margin-top: 22px;

            .box-all-item {
                margin-right: 25px;
                cursor: pointer;

                &:hover {
                    color: #fdd55a;
                }
            }
        }

        > section {
            height: 438px;
            margin-top: 35px;
            overflow-y: auto;

            /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
            &::-webkit-scrollbar {
                width: 10px;
                height: 1.5px;
                background-color: #2D2A38;
                border-radius: 40px;
                overflow: hidden;
            }

            /*定义滚动条轨道 内阴影+圆角*/
            &::-webkit-scrollbar-track {
                border-radius: 40px;
                -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.1);
                background-color: transparent;
            }

            /*定义滑块 内阴影+圆角*/
            &::-webkit-scrollbar-thumb {
                border-radius: 40px;
                -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.1);
                background-color: #524E60;
            }

            .box-reward-item {
                width: 676px;
                height: 112px;
                border: 2px solid #818189;
                border-radius: 8px;
                padding-left: 23px;
                @include flex;
                margin-bottom: 18px;
                position: relative;

                &.out {
                    &::before {
                        content: "";
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 1;
                        border-radius: 8px;
                        background-color: rgba($color: #000000, $alpha: 0.7);
                    }
                    &::after {
                        content: "Sold Out";
                        width: 170px;
                        height: 38px;
                        background: #c0182c;
                        border: 1px solid #ffffff;
                        border-radius: 30px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        z-index: 5;
                        font-size: 20px;
                        line-height: 24px;
                        font-weight: 600;
                        color: #ffffff;
                        transform: translate(-50%, -50%);
                        @include flexCenter;
                    }
                }

                > img {
                    width: 79px;
                    height: 72px;
                    margin-right: 27px;
                }

                .box-content {
                    width: 500px;
                    @include flex;
                    flex-wrap: wrap;

                    .box-child-item {
                        @include flex;
                        line-height: 14px;
                        font-size: 20px;
                        font-weight: 400;
                        color: #ffffff;
                        width: 110px;

                        &:nth-child(-n + 4) {
                            margin-bottom: 17px;
                        }

                        p {
                            color: #61616b;
                            margin-left: 7px;
                        }
                    }
                }
            }
        }
    }
}
.modal-random-box {
    border-radius: 10px;
    overflow: hidden;
}
</style>
