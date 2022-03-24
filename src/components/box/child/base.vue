<template>
    <div></div>
</template>

<script>
import common from "@/common/common";

export default {
    mixins: [common],
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    filters: {
        fixed(num) {
            return Number(num).toFixed(4);
        }
    },
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {},
    //数据
    data() {
        return {
            curPageCatList: [
                {
                    name: 'A Reward Cat',
                    path: require("../../../assets/img/box/A@2x.png"),
                    text: '0/1',
                    status: 1 // 1-默认，2-已出售
                },
                {
                    name: 'B Reward Cat',
                    path: require("../../../assets/img/box/B@2x.png"),
                    text: '0/1',
                    status: 2 // 1-默认，2-已出售
                },
                {
                    name: 'C Reward Cat',
                    path: require("../../../assets/img/box/C@2x.png"),
                    text: '0/1',
                    status: 1 // 1-默认，2-已出售
                },
                {
                    name: 'D Reward Cat',
                    path: require("../../../assets/img/box/D@2x.png"),
                    text: '0/1',
                    status: 2 // 1-默认，2-已出售
                },
                {
                    name: 'E Reward Cat',
                    path: require("../../../assets/img/box/E@2x.png"),
                    text: '0/1',
                    status: 1 // 1-默认，2-已出售
                },
                {
                    name: 'F Reward Cat',
                    path: require("../../../assets/img/box/F@2x.png"),
                    text: '0/1',
                    status: 2 // 1-默认，2-已出售
                },
                {
                    name: 'G Reward Cat',
                    path: require("../../../assets/img/box/G@2x.png"),
                    text: '0/1',
                    status: 1 // 1-默认，2-已出售
                },
                {
                    name: 'Last Reward Cat',
                    path: require("../../../assets/img/box/A@2x.png"),
                    text: '0/1',
                    status: 1 // 1-默认，2-已出售
                },
            ],
            catGetList: [
                {
                    name: 'A Reward Cat',
                    path: require("../../../assets/img/box/A@2x.png"),
                    text: '0/1',
                    status: 1 // 1-默认，2-已出售
                },
                {
                    name: 'B Reward Cat',
                    path: require("../../../assets/img/box/B@2x.png"),
                    text: '0/1',
                    status: 2 // 1-默认，2-已出售
                },
                {
                    name: 'C Reward Cat',
                    path: require("../../../assets/img/box/C@2x.png"),
                    text: '0/1',
                    status: 1 // 1-默认，2-已出售
                },
                {
                    name: 'A Reward Cat',
                    path: require("../../../assets/img/box/A@2x.png"),
                    text: '0/1',
                    status: 1 // 1-默认，2-已出售
                },
                {
                    name: 'B Reward Cat',
                    path: require("../../../assets/img/box/B@2x.png"),
                    text: '0/1',
                    status: 2 // 1-默认，2-已出售
                },
                {
                    name: 'C Reward Cat',
                    path: require("../../../assets/img/box/C@2x.png"),
                    text: '0/1',
                    status: 1 // 1-默认，2-已出售
                },
                {
                    name: 'A Reward Cat',
                    path: require("../../../assets/img/box/A@2x.png"),
                    text: '0/1',
                    status: 1 // 1-默认，2-已出售
                },
                {
                    name: 'B Reward Cat',
                    path: require("../../../assets/img/box/B@2x.png"),
                    text: '0/1',
                    status: 2 // 1-默认，2-已出售
                },
                {
                    name: 'C Reward Cat',
                    path: require("../../../assets/img/box/C@2x.png"),
                    text: '0/1',
                    status: 1 // 1-默认，2-已出售
                },
                {
                    name: 'A Reward Cat',
                    path: require("../../../assets/img/box/A@2x.png"),
                    text: '0/1',
                    status: 1 // 1-默认，2-已出售
                },
                {
                    name: 'B Reward Cat',
                    path: require("../../../assets/img/box/B@2x.png"),
                    text: '0/1',
                    status: 2 // 1-默认，2-已出售
                },
                {
                    name: 'C Reward Cat',
                    path: require("../../../assets/img/box/C@2x.png"),
                    text: '0/1',
                    status: 1 // 1-默认，2-已出售
                },
            ],
            rankList: [
                '1 - 50',
                '51 - 100',
                '101 - 142',
            ],
            catAllList: [
                {
                    name: "All",
                    type: 0,
                },
                {
                    name: "A Reward",
                    type: 0,
                },
                {
                    name: "B Reward",
                    type: 0,
                },
                {
                    name: "C Reward",
                    type: 0,
                },
                {
                    name: "D Reward",
                    type: 0,
                },
                {
                    name: "E Reward",
                    type: 0,
                },
                {
                    name: "F Reward",
                    type: 0,
                },
                {
                    name: "G Reward",
                    type: 0,
                },
                {
                    name: "Last Reward",
                    type: 0,
                },
            ],
            rewardList: [
                {
                    path: require("../../../assets/img/box/img-rewardList-demo.png"),
                    list: [
                        {
                            name: "A",
                            content: "0/1"
                        },
                        {
                            name: "B",
                            content: "0/1"
                        },
                        {
                            name: "C",
                            content: "0/1"
                        },
                        {
                            name: "D",
                            content: "0/1"
                        },
                        {
                            name: "E",
                            content: "0/1"
                        },
                        {
                            name: "F",
                            content: "0/1"
                        },
                        {
                            name: "G",
                            content: "0/1"
                        },
                        {
                            name: "Last",
                            content: "0/1"
                        },
                    ],
                    status: 1
                },
                {
                    path: require("../../../assets/img/box/img-rewardList-demo.png"),
                    list: [
                        {
                            name: "A",
                            content: "0/1"
                        },
                        {
                            name: "B",
                            content: "0/1"
                        },
                        {
                            name: "C",
                            content: "0/1"
                        },
                        {
                            name: "D",
                            content: "0/1"
                        },
                        {
                            name: "E",
                            content: "0/1"
                        },
                        {
                            name: "F",
                            content: "0/1"
                        },
                        {
                            name: "G",
                            content: "0/1"
                        },
                        {
                            name: "Last",
                            content: "0/1"
                        },
                    ],
                    status: 2
                },
                {
                    path: require("../../../assets/img/box/img-rewardList-demo.png"),
                    list: [
                        {
                            name: "A",
                            content: "0/1"
                        },
                        {
                            name: "B",
                            content: "0/1"
                        },
                        {
                            name: "C",
                            content: "0/1"
                        },
                        {
                            name: "D",
                            content: "0/1"
                        },
                        {
                            name: "E",
                            content: "0/1"
                        },
                        {
                            name: "F",
                            content: "0/1"
                        },
                        {
                            name: "G",
                            content: "0/1"
                        },
                        {
                            name: "Last",
                            content: "0/1"
                        },
                    ],
                    status: 2
                },
                {
                    path: require("../../../assets/img/box/img-rewardList-demo.png"),
                    list: [
                        {
                            name: "A",
                            content: "0/1"
                        },
                        {
                            name: "B",
                            content: "0/1"
                        },
                        {
                            name: "C",
                            content: "0/1"
                        },
                        {
                            name: "D",
                            content: "0/1"
                        },
                        {
                            name: "E",
                            content: "0/1"
                        },
                        {
                            name: "F",
                            content: "0/1"
                        },
                        {
                            name: "G",
                            content: "0/1"
                        },
                        {
                            name: "Last",
                            content: "0/1"
                        },
                    ],
                    status: 1
                },
            ],
            curRankIdx: 0,
            isShowGetModal: false,
            isShowChangeModal: false,
            isShowAllBox: false,
            isShowBoxModal: false,
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        handleCloseBoxPop() {
            this.isShowBoxModal = false;
        },
        handleOpenRandomBox() {
            this.isShowBoxModal = true;
        },
        switchAllBox() {
            this.isShowAllBox = !this.isShowAllBox;
        },
        selectCurRank(index) {
            this.curRankIdx = index;
        },
        clearGetModal() {
            $("body").removeClass("disable");
            this.isShowGetModal = false;
        },
        clearChangeModal() {
            $("body").removeClass("disable");
            this.isShowChangeModal = false;
        },
        handleGetAll() {
            $("body").addClass("disable");
            this.isShowGetModal = true;
        },
        handleChangeBox() {
            $("body").addClass("disable");
            this.isShowChangeModal = true;
        },
        confirmGetCat() {
            this.clearGetModal();
            this.$toast({
                message: 'The purchase is successful, please go to my cat to check.',
                className: 'commonToast-1'
            })
        }
    },
    //请求数据
    created() {},
    mounted() {}
};
</script>

<style scoped></style>
