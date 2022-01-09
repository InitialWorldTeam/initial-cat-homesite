<template>
    <div class="container-box">
        <main>
            <div class="box-1">
                <h1>Special Loot Box</h1>
                <h2>The remaining amount: 3870/9940</h2>
                <div class="box-price">
                    <i></i>
                    <span>1 KSM</span>
                    <div>≈ $ 350</div>
                </div>
            </div>

            <!-- All Boxes -->
            <div class="box-all-box-list">
                <!-- 分页器 -->
                <header>
                    <div class="btn-page-switch btn-previous">
                        <i></i>Previous
                    </div>
                    <div class="box-info">
                        <div class="box-info-item">
                            <span>Box</span>
                            <span class="item-left">61/</span>
                            <span class="item-all">142</span>
                        </div>
                        <div class="box-info-item">
                            <span>Remaining</span>
                            <span class="item-left">39/</span>
                            <span class="item-all">70</span>
                        </div>
                    </div>
                    <div class="btn-page-switch btn-next">Next<i></i></div>
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

            <div class="box-3">
                <div class="box-orders">
                    <div class="box-order-item">Place 1 Order</div>
                    <div class="box-order-item">Place 3 Order</div>
                    <div class="box-order-item">Place 5 Order</div>
                </div>
                <div class="box-btns">
                    <div class="btn-item btn-change" @click="handleChangeBox">
                        Change Box
                    </div>
                    <div class="btn-item btn-all" @click="handleGetAll">
                        All
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

                    <div class="container-cat-all" v-if="isShowAllBox">
                        <div class="btn-scroll" @click="handleScrollTypes"></div>
                        <div class="box-cat-all" ref="boxTypes">
                            <div
                                v-for="item in catAllList"
                                :key="item.id"
                                class="box-all-item"
                                v-text="item.name"
                            ></div>
                        </div>
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
        handleScrollTypes() {
            const left = this.$refs.boxTypes.scrollLeft;
            this.$refs.boxTypes.scrollTo({
                left: left + 80,
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
.container-box {
    > main {
        padding-bottom: 90px;
    }

    .box-about {
        margin-top: 69px;

        h1 {
            line-height: 23px;
            font-size: 23px;
            font-weight: normal;
            color: #ffffff;
            padding-left: 19px;
        }

        section {
            padding: 21px 36px 0;
            box-sizing: content-box;

            p {
                font-size: 12px;
                font-weight: 400;
                color: #8c8c93;
                line-height: 18px;

                &:not(:last-child) {
                    margin-bottom: 20px;
                }
            }
        }
    }

    .box-1 {
        padding: 53px 0 0 19px;
        h1 {
            line-height: 23px;
            font-size: 23px;
            font-weight: normal;
            color: #ffffff;
        }
        h2 {
            line-height: 14px;
            font-size: 15px;
            font-weight: 400;
            color: #818189;
            margin-top: 10px;
        }
        .box-price {
            display: flex;
            align-items: center;
            margin-top: 20px;
            line-height: 22px;

            i {
                width: 22px;
                height: 22px;
                @include bg-item;
                background-image: url(../../../assets/img/common/img-logo-ksm.png);
                margin-right: 5px;
            }
            span {
                font-size: 21px;
                font-weight: 400;
                color: #fefeff;
                margin-right: 16px;
            }
            div {
                font-size: 15px;
                font-weight: 400;
                color: #818189;
            }
        }
    }

    .box-3 {
        padding: 36px 20px 0;

        .box-orders {
            display: flex;
            flex-wrap: wrap;
            width: 110%;

            .box-order-item {
                @include btn-common;
                padding: 0 15px;
                font-size: 13px;
                font-weight: 600;
                color: #110f19;
                letter-spacing: -0.5px;
                height: 33px;
                flex-shrink: 0;
                margin-bottom: 10px;

                &:not(:last-child) {
                    margin-right: 7px;
                }
            }
        }

        .box-btns {
            margin-top: 16px;
            display: flex;

            .btn-item {
                flex: 1;
                height: 45px;
                border-radius: 41px;
                @include flexCenter;
                cursor: pointer;

                &:not(:last-child) {
                    margin-right: 8px;
                }
            }

            .btn-all {
                background: #fdd55a;
                font-size: 20px;
                font-weight: 600;
                color: #110f19;
                line-height: 40px;
            }

            .btn-change {
                border: 1px solid #fdd55a;
                font-size: 15px;
                font-weight: 400;
                color: #fdd55a;
                margin-right: 13px;
            }
        }
    }

    .box-all-box-list {
        height: 614px;
        background: #08070c;
        margin-top: 38px;

        header {
            padding: 19px 20px 0;
            @include flexBetween;

            .btn-page-switch {
                font-size: 13px;
                font-weight: 400;
                color: #77e1fd;
                letter-spacing: -.5px;
                display: flex;
                align-items: center;

                i {
                    width: 6px;
                    height: 11px;
                    @include bg-item;
                    background-image: url(../../../assets/img/common/icon-arrow-right.png);
                }
            }
            .btn-previous {
                i {
                    margin-right: 5px;
                    transform: rotate(180deg);
                }
            }
            .btn-next {
                i {
                    margin-left: 5px;
                }
            }
            .box-info {
                font-size: 13px;
                line-height: 16px;
                font-weight: 400;
                color: #818189;
                display: flex;

                .box-info-item {
                    display: flex;
                    &:first-child {
                        margin-right: 13px;
                    }

                    .item-left {
                        color: #fff;
                        margin-left: 4px;
                    }
                }
            }
        }

        section {
            padding: 22px 8vw 0;
            display: flex;
            flex-wrap: wrap;

            .box-cat-item {
                width: 90px;
                margin-bottom: 18px;
                text-align: center;
                position: relative;

                &:not(:nth-child(3n)) {
                    margin-right: calc((100% - 270px) / 2) ;
                }

                &.out {
                    &::before {
                        content: "";
                        width: 100%;
                        height: 135px;
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 1;
                        background-color: rgba($color: #000000, $alpha: 0.7);
                    }
                    &::after {
                        content: "Sold Out";
                        width: 70px;
                        height: 24px;
                        background: #c0182c;
                        border: 1px solid #ffffff;
                        border-radius: 30px;
                        position: absolute;
                        left: 50%;
                        top: 56px;
                        z-index: 5;
                        font-size: 14px;
                        line-height: 16px;
                        font-weight: bold;
                        letter-spacing: -.5px;
                        color: #ffffff;
                        transform: translate(-50%, 0);
                        @include flexCenter;
                    }
                }

                img {
                    display: block;
                    height: 135px;
                }

                h4 {
                    font-size: 12px;
                    line-height: 9px;
                    font-family: Myriad Pro;
                    font-weight: 400;
                    color: #ffffff;
                    letter-spacing: -.5px;
                    margin-top: 8px;
                    @include ellipsis;
                }

                p {
                    font-size: 12px;
                    line-height: 9px;
                    font-weight: 400;
                    color: #61616b;
                    margin-top: 6px;
                }
            }
        }
    }
}
.box-get-modal {
    @extend .modal-common-app;

    main {
        width: 85.33vw;
        padding: 29px 16px 0;
        background: #110f19;
        border-radius: 12px;
        @include flex;
        flex-direction: column;
        height: 530px;
        position: relative;

        h1 {
            font-size: 23px;
            line-height: 24px;
            font-weight: normal;
            color: #ffffff;
        }

        .box-get-list {
            width: 100%;
            @include flex;
            margin-top: 42px;
            flex-wrap: wrap;
            height: 350px;
            overflow-y: auto;

            .box-get-item {
                width: 86px;
                flex-shrink: 0;
                margin-bottom: 14px;

                &:not(:nth-child(3n)) {
                    margin-right: 3.7vw;
                }

                img {
                    display: block;
                    height: 128px;
                }
                h5 {
                    line-height: 9px;
                    font-size: 12px;
                    font-weight: 400;
                    color: #ffffff;
                    margin-top: 7px;
                }
            }
        }

        .btn-confirm {
            @include btn-common;
            width: 133px;
            height: 37px;
            background: #77e1fd;
            font-size: 16px;
            font-weight: 600;
            position: absolute;
            left: 50%;
            bottom: 36px;
            z-index: 1;
            transform: translate(-50%, 0);
        }
    }
}
.box-change-modal {
    @extend .modal-common-app;

    main {
        width: 85.33vw;
        padding: 28px 4px 0 7px;

        h1 {
            line-height: 18px;
            font-size: 23px;
            font-weight: normal;
            color: #ffffff;
        }

        .box-rank-page-list {
            margin-top: 29px;
            display: flex;

            .box-rank-item {
                margin-right: 7px;
                width: 77px;
                height: 26px;
                background: #2d2a38;
                border-radius: 20px;
                @include flexCenter;
                font-size: 14px;
                line-height: 18px;
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
            height: 12px;
            font-size: 14px;
            line-height: 12px;
            font-weight: 400;
            color: #ffffff;

            .btn-type-all {
                display: flex;
                cursor: pointer;
                height: 14px;

                i {
                    background: url(../../../assets/img/common/icon-arrow-down.png)
                        no-repeat right center / 11px auto;
                    width: 11px;
                    height: 13px;
                    transform: rotate(180deg);
                    transition: all 0.2s;
                    margin-left: 5px;
                }

                &.open {
                    i {
                        transform: rotate(0deg);
                    }
                }
            }

            .box-type-item {
                padding-right: 17px;
                background: url(../../../assets/img/common/icon-sort.png)
                    no-repeat right center / 12px auto;
                cursor: pointer;
                margin-right: 24px;

                &:hover {
                    color: #fdd55a;
                    background-image: url(../../../assets/img/common/icon-sort-cur.png);
                }
            }
        }

        .container-cat-all {
            position: relative;

            .btn-scroll {
                width: 40px;
                height: 14px;
                position: absolute;
                right: 0;
                top: 1px;
                z-index: 1;
                background: url(../../../assets/img/common/btn-right.png) no-repeat center top / 6px auto;
                background-color: #110f19;
            }
        }

        .box-cat-all {
            display: flex;
            align-items: center;
            height: 14px;
            font-size: 14px;
            line-height: 16px;
            font-weight: 400;
            color: #ffffff;
            letter-spacing: -0.5px;
            margin-top: 22px;
            width: 100%;
            overflow-x: auto;
            padding-right: 40px;
            position: relative;

            .box-all-item {
                margin-right: 15px;
                flex-shrink: 0;
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
                background-color: #2d2a38;
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
                background-color: #524e60;
            }

            .box-reward-item {
                // width: 676px;
                height: 65px;
                border: 1px solid #818189;
                border-radius: 4px;
                padding-left: 11px;
                @include flex;
                margin-bottom: 10px;
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
                        border-radius: 4px;
                        background-color: rgba($color: #000000, $alpha: 0.7);
                    }
                    &::after {
                        content: "Sold Out";
                        width: 120px;
                        height: 34px;
                        background: #c0182c;
                        border: 1px solid #ffffff;
                        border-radius: 30px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        z-index: 5;
                        font-size: 16px;
                        line-height: 20px;
                        font-weight: 600;
                        color: #ffffff;
                        transform: translate(-50%, -50%);
                        @include flexCenter;
                    }
                }

                > img {
                    width: 50px;
                    height: 46px;
                    margin-right: 13px;
                }

                .box-content {
                    width: 500px;
                    @include flex;
                    flex-wrap: wrap;

                    .box-child-item {
                        @include flex;
                        line-height: 14px;
                        font-size: 14px;
                        font-weight: 400;
                        color: #ffffff;
                        width: 55px;

                        &:nth-child(-n + 4) {
                            margin-bottom: 12px;
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
</style>
