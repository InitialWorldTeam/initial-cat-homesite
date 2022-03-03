<template>
    <div></div>
</template>

<script>
import UTILS from "@/config/util";
import mailApi from "@/config/mailApi";
import common from "@/common/common";
import preventDoublePress from "@/config/preventDoublePress";
import FreeMint from "@/components/freeMint";

export default {
    mixins: [common],
    //部件
    components: {
        FreeMint
    },
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        curEcoItem() {
            return this.ecoTabList[this.cueEcoIdx];
        },
        isConnectWallet() {
            return Boolean(this.curRootWallet);
        }
    },
    //数据
    data() {
        return {
            userEmail: "",
            lootBoxImg: require("../../../assets/img/home/bg-loot-box.png")
                .default,
            bannerList: [
                /* {
                    img: require("../../../assets/img/home/bg-home-banner.png").default,
                    text: require("../img/banner-text-InitialWorld.png"),
                    type: 'auto'
                }, */
                {
                    img: require("../img/banner-mint-pc.jpeg").default,
                    text: null,
                    type: "mint"
                }
            ],
            bannerListApp: [
                {
                    img: require("../img/banner-mint-app.jpeg").default,
                    text: null,
                    type: "mint"
                }
            ],
            memorialNftImg: {
                big: require("../../../assets/img/home/bg-memorNFT-top.png")
                    .default,
                small: require("../../../assets/img/home/bg-memorNFT-small.png")
                    .default
            },
            slideList: [
                {
                    title: "What is InitialWorld?",
                    img: require("../../../assets/img/home/img-introduction-1.png")
                        .default,
                    domId: ""
                },
                {
                    title: "What is InitialStudio?",
                    img: require("../../../assets/img/home/img-introduction-2.png")
                        .default,
                    domId: "userClient"
                },
                {
                    title: "SubMetaverse",
                    img: require("../../../assets/img/home/img-introduction-3.png")
                        .default,
                    domId: "metaverse"
                },
                {
                    title: "Free mint InitialCat",
                    img: require("../../../assets/img/home/img-introduction-4.png").default,
                    domId: "mysteryBox"
                }
            ],
            partnerList: [
                require("../img/icon-partner-1.png"),
                require("../img/img-rmrk.png").default,
                require("../img/icon-partner-3.png"),
                require("../img/icon-partner-4.png"),
                require("../img/icon-partner-5.png"),
                require("../img/icon-partner-6.png"),
                require("../img/img-ipfs.png").default,
                require("../img/icon-partner-8.png")
            ],
            communityList: [
                {
                    icon: require("../../../assets/img/home/icon-twitter.png"),
                    title: "Twitter",
                    url: "https://twitter.com/InitialWorldLab"
                },
                /* {
                    icon: require("../../../assets/img/home/icon-telegram.png"),
                    title: 'Telegram',
                    url: 'https://t.me/InitialWorld'
                }, */
                {
                    icon: require("../../../assets/img/home/icon-discord.png"),
                    title: "Discord",
                    // url: 'https://discord.gg/hmmmQt2jGn'
                    url: ""
                },
                {
                    icon: require("../img/icon-medium.png"),
                    title: "Medium",
                    url: "https://medium.com/@InitialWorld"
                }
            ],
            cueEcoIdx: 0, // 当前EcoTab索引值
            ecoTabList: [
                {
                    name: "InitialCat 3D",
                    type: 2,
                    content: require("../img/img-eco-initialCat.png").default,
                    des:
                        "Cat is the first theme avatars of InitialWorld. When you enter InitialWorld, you will get an InitialCat 3D NFT for free. You can use this Initial Cat to enter any Metaverse connected to Initial World and get Loot to equip it."
                },
                {
                    name: "Accessories NFT",
                    type: 2,
                    content: require("../img/img-eco-nft.png"),
                    des:
                        "Users may get NFT in different SubMetaverse. We call it Accessories NFT. Accessories NFT can make your themed avatar more gorgeous. When avatar is equipped with Accessories NFT, you can get more $NIC in the mission. You can sell your own Accessories NFT to other users."
                },
                {
                    name: "Suite NFT",
                    type: 2,
                    content: require("../img/img-eco-suiteNft.png").default,
                    des:
                        "Suite NFT is very precious in InitialWorld. It is very difficult to collect a complete Suite NFT. Similarly, Suite NFT will bring a very big image change to your avatar. Usually these changes are of commemorative significance."
                },
                {
                    name: "Ecosystem",
                    type: 3,
                    content: require("../img/img-eco-system.png"),
                    des: ""
                },
                {
                    name: "SubMetaverse",
                    type: 2,
                    content: require("../img/img-eco-metaverse.jpeg").default,
                    des:
                        "SubMetaverse is made by InitialWorld Team and its partners based on the InitialStudio being developed. Users can use Initial Cat 3D to travel among them. When InitialStudio is fully developed, you can use InitialStudio to easily create their own SubMetaverse and share it with other users. "
                }
            ],
            subscribeEmailTip: {
                tip1: "Please input your email",
                tip2: "Your email address is missing @",
                tip3: "Please enter the part after @",
                tip4: "Please provide a valid email address.",
                tip5: "Thank you, your sign-up request was successful! ",
                tip6: "Something error, please try again"
            },
            checkEmailTip: "",
            checkEmailPass: false
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        async goToConnect() {
            this.goToMint();
        },
        goToLearn() {
            let url =
                "https://medium.com/@InitialWorld/free-minting-on-kusama-initialworld-to-provide-connections-to-all-the-metaverse-f34b78bb1dd2";
            window.open(url);
        },
        initBanner() {
            this.myBanner && this.myBanner.destroy(false);
            this.myBanner = new Swiper(".swiper-banner", {
                loop: this.bannerList.length > 1, // 循环模式选项
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay
                },
                slidesPerView: 1
            });
        },
        async goToBanner(item) {
            if (!this.isConnectWallet) {
                const sta = await this.initWallet();
                if (!sta) {
                    this.connectWalletFail();
                    return;
                }
            }

            const { type } = item;
            if (type === "mint") {
                this.goToMint();
            }
        },
        async goToMint() {
            if (!this.apiProvider) {
                const sta = await this.initWallet();
                if (!sta) {
                    this.connectWalletFail();
                    return;
                }
            }
            this.$refs.freeMint.handleShowMint();
        },
        // 点击事件，Join Us
        handleJoinCommunity(item) {
            if (item.url) {
                window.open(item.url);
            }
        },
        goToNav(item, index) {
            if (!item.path || this.$route.path === item?.path) {
                return false;
            }
            this.$router.push({
                path: item.path
            });
            this.locationNavLine(index);
        },
        locationNavLine(index) {
            // 定位当前导航
            const e = $(".box-nav-item").eq(index);
            const LEFT = e.position().left + e.width() / 2;
            $(".block-line").css({
                left: LEFT + "px"
            });
        },
        selectEcoTab(idx) {
            this.cueEcoIdx = idx;
        },
        handleGoIntroductDetail(item) {
            this.$router.push({
                name: "Faq",
                params: {
                    id: item.domId
                }
            });
            if (this.isApp) {
                return;
            }
            this.locationNavLine(5);
        },
        preventDoublePress(callback, delay = 3000) {
            preventDoublePress.onPress(callback, delay);
        },
        handleSubEmail() {
            let email = this.userEmail;
            if (!email) {
                this.toastEmailTip(this.subscribeEmailTip.tip1);
                return;
            }

            if (!email.includes("@")) {
                this.toastEmailTip(this.subscribeEmailTip.tip2);
                return;
            }

            if (email.indexOf("@") === email.length - 1) {
                this.toastEmailTip(this.subscribeEmailTip.tip3);
                return;
            }

            if (!UTILS.checkIsEmail(email)) {
                this.toastEmailTip(this.subscribeEmailTip.tip4);
                return;
            }

            this.subscribeEmail(email);
        },
        subscribeEmail(email) {
            let config = {
                email
            };
            let url = mailApi.subEmail;

            this.$http
                .post(url, config, "json")
                .then(res => {
                    const { code } = res;
                    if (code === "0000") {
                        this.toastEmailTip(this.subscribeEmailTip.tip5);
                        this.checkEmailPass = true;
                        this.userEmail = "";
                    }
                })
                .catch(err => {
                    console.log("err:", err);
                    this.toastEmailTip(this.subscribeEmailTip.tip6);
                    return false;
                });
        },
        toastEmailTip(msg) {
            this.checkEmailTip = msg;

            let timer = setTimeout(() => {
                this.checkEmailPass = false;
                this.checkEmailTip = "";
                clearTimeout(timer);
            }, 3000);
        }
    },
    //请求数据
    created() {},
    mounted() {
        this.initBanner();
    }
};
</script>

<style scoped></style>
