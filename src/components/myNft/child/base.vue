<template>
    <div></div>
</template>

<script>
import common from "@/common/common";
import { CountUp } from 'countup.js';
import Decimal from "decimal.js";

export default {
    mixins: [common],
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {
        curRootWallet(newVal) {
            if (newVal) {
                this.$router.push({
                    path: `/myNft/${newVal.address}`
                });
            }
        },
        urlAddress(newVal) {
            if (newVal) {
                this.queryBalance(newVal);
            }
        },
        myNftAssets(newVal) {
            if (newVal) {
                this.countNum('assetNum', newVal.length, {
                    duration: 3,
                });
            }
        },
        curQueryWallet(newVal) {
            if (newVal) {
                const res = this.formatKsmUnit(newVal.balance.free);
                this.countNum('balance', +res, {
                    decimalPlaces: 4
                });
            }
        }
    },
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        isShowSellModal() {
            return Boolean(this.curSellCat);
        },
        urlAddress() {
            return this.$route.params?.id;
        },
        kusamaUsdPrice() {
            const x = new Decimal(this.kusamaPrice);
            const y =  this.curQueryWallet ? new Decimal( this.formatKsmUnit(this.curQueryWallet?.balance?.free)) : 0;
            return x.times(y).toFixed(4);
        }
    },
    //数据
    data() {
        return {
            sellPrice: 0, // 出售价格
            curSellCat: null, // 当前出售Cat
            kusamaPrice: 0, // 当前 Kusama 实时价格
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        onCopy: function(e) {
            this.$toast(`已复制：${e.text}`);
        },
        // 点击事件-选择出售Cat
        sellCat(item) {
            $("body").addClass("disable");
            this.curSellCat = item;
        },
        // 取消出售
        clearCellCat() {
            this.curSellCat = null;
            $("body").removeClass("disable");
        },
        goToDetail(item) {
            const PATH = "/collectibles/" + item.id;
            this.$router.push({
                path: PATH
            });
        },
        countNum(el, endNum, option) {
            var options = {
                useEasing: true, // 使用缓和
                useGrouping: false, // 使用分组(是否显示千位分隔符,一般为 true)
                separator: ",", // 分隔器(千位分隔符,默认为',')
                decimal: ".", // 十进制(小数点符号,默认为 '.')
                prefix: "", // 字首(数字的前缀,根据需要可设为 $,¥,￥ 等)
                suffix: "", // 后缀(数字的后缀 ,根据需要可设为 元,个,美元 等)
                smartEasingAmount: 10,
                duration: 5,
                ...option
            };

            let demo = new CountUp(el, +endNum, options);
            demo.start();
        },
        formatKsmUnit(num) {
            return new Decimal(+num / Decimal.pow(10, 12)).toFixed(4);
        },
    },
    //请求数据
    async created() {
        const { price } = await this.getKusamaPrice();
        this.kusamaPrice = price;

        if (this.urlAddress) {
            this.queryBalance(this.urlAddress);
        }
    },
    async mounted() {}
};
</script>

<style scoped></style>
