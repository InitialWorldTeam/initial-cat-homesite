<template>
    <div class="container-faq">
        <main>
            <h1 class="title">InitialWorld FAQ</h1>
            <section>
                <!-- <h2>InitialWorld</h2> -->
                <!-- <h2>Preface</h2> -->
                <p>InitialWorld is a coordinated Metaverse Connector based on blockchain. NFT will be used as a core asset for cross-metaverse transfer.</p>
                <p>At Initial World, we will build a stream of low-barrier technical tools to help studios and users easily create SubMetaverse and NFT, allowing simple integration into all Metaverse via Initial World.</p>

                <div class="list-item" id="userClient">
                    <h3>InitialWorld User Client</h3>
                    <div>1. Coordinate connection between Metaverse and SubMetaverse</div>
                    <div>2. Use and trade the NFT obtained from Metaverse (Connected)</div>
                    <div>3. Use your own NFT in other Metaverse (Connected)</div>
                </div>

                <div class="list-item">
                    <h3>Avatar NFT</h3>
                    <div>Cat is the first theme image of Initial World. When you enter Initial World, you will get an Initial Cat 3D for free. You can use this Initial Cat to enter any Metaverse connected to Initial World and get Loot to equip it.</div>
                    <div>We will continue to introduce new themed avatars until users can use InitialStudio to create their own avatars.</div>
                    <div></div>
                </div>

                <div class="list-item">
                    <h3>Rare NFT</h3>
                    <div>You can get rare NFT in many ways. It represents the release of a new theme image of Initial World. Whenever a new theme image is added to Initial World, a new treasure NFT will be issued.</div>
                    <video
                        :src='require("../../home/video/video-rareNft.mp4").default'
                        muted
                        autoplay
                        loop
                        class="video-item"
                    ></video>
                </div>

                <div class="list-item">
                    <h3>Accessories NFT</h3>
                    <div>Users may get NFT in different SubMetaverse. We call it Accessories NFT. Accessories NFT can make your themed avatar more gorgeous. When avatar is equipped with Accessories NFT, you can get more $NIC in the mission. You can sell your own Accessories NFT to other users.</div>
                </div>

                <div class="list-item">
                    <h3>Suite NFT</h3>
                    <div>Suite NFT is very precious in InitialWorld. It is very difficult to collect a complete Suite NFT. Similarly, Suite NFT will bring a very big image change to your avatar. Usually these changes are of commemorative significance. After avatar is equipped with a complete Suite NFT, completing the task will get more $NIC rewards than users equipped with Accessories NFT.</div>
                </div>

                <div class="list-item">
                    <h3>Home</h3>
                    <div>Before the launch of InitialStudio, InitialWorld will customize a standardized Home for users. Users can display their NFTs in their Homes and get more rewards.</div>
                </div>

                <div class="list-item" id="metaverse">
                    <h3>SubMetaverse</h3>
                    <div>SubMetaverse is made by Initial World Team and its partners based on the InitialStudio being developed. Users can use Initial Cat 3D to travel among them. When InitialStudio is fully developed, you can use InitialStudio to easily create their own SubMetaverse and share it with other users.</div>
                </div>

                <div class="list-item" id="mysteryBox">
                    <h3>Mystery Box</h3>
                    <div>Users can obtain NFTs launched by SubMetaverse and InitialWorld through Mystery Box. After InitialStudio is opened, users can obtain user-made NFTs through Mystery Box.</div>
                </div>

                <div class="list-item">
                    <h3>Marketplace</h3>
                    <div>Users can trade their NFT assets acquired in any SubMetaverse in the InitialWorld Marketplace.</div>
                </div>

                <div class="list-item">
                    <h3>DAO</h3>
                    <div>Users can create and join DAO through InitialWorld. DAO can help you socialize better and get rewards faster in InitialWorld.</div>
                </div>

                <div class="list-item">
                    <h3>Tokenomics</h3>
                </div>

            </section>

            <section>
                <h2>$NIC</h2>
                <p>The governance token and the only payment medium recognized by the InitialWorld.</p>

                <div class="list-item">
                    <h3>Total Supply</h3>
                    <div>1,000,000,000 (no inflation)</div>
                </div>

                <div class="list-item">
                    <h3>Allocation</h3>
                </div>

                <div class="list-item">
                    <h3>Utilities</h3>
                    <div>a.Free to mint your InitialWorld Avatar.</div>
                    <div>b.Buy Mystery Box, get InitialWorld Rare NFT, wait for airdrop.</div>
                    <div>c.InitialWorld and SubMetaver 1 will be launched soon.</div>
                    <div>d. SubMetaverse 1 will sell exclusive NFT.</div>
                </div>

                <div class="list-item">
                    <h3>Main Elements Logic Map Demonstration</h3>
                </div>

                <div class="list-item">
                    <h3>Revenue Streams</h3>
                    <div>【Selling of InitialWorld-Rare NFT Mystery Boxes (100% platform)】</div>
                    <div>【Selling of SubMetaverse NFT Mystery Boxes (30% platform; 70% SubMetaverse)】</div>
                    <div>【Marketplace Transaction Fees (5% in $NIC )】</div>
                </div>

                <div class="list-item">
                    <h3>Coming soon</h3>
                    <div>InitialStudio</div>
                    <div>Avatar</div>
                    <div>Home</div>
                    <div>Shop</div>
                    <div>Game</div>
                    <div>More</div>
                </div>

            </section>
        </main>
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
        return {
            
        };
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        
    },
    //请求数据
    created() {},
    mounted() {
        if (this.domId) {
            const dom = `#${this.domId}`;
            document.querySelector(dom).scrollIntoView({
                behavior: "auto", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
            });
        }
    }
};
</script>

<style scoped lang="scss">
$color2: rgba($color: #fff, $alpha: 0.8);
.container-faq {
    padding-top: 100px;
    
    main {
        @extend .common-pc-width;
        margin: 0 auto;
        padding-bottom: 188px;
        
        .title {
            text-align: center;
            font-size: 20px;
            line-height: 30px;
        }

        section {
            margin-top: 36px;

            h2 {
                font-size: 18px;
                line-height: 24px;
                color: rgba($color: #fff, $alpha: 1.0);
            }

            p {
                font-size: 14px;
                line-height: 18px;
                margin-top: 16px;
                color: $color2;
            }
        }

        .list-item {
            margin-top: 20px;

            h3 {
                font-size: 14px;
                line-height: 24px;
                position: relative;
                padding-left: 12px;

                &::after {
                    content: "";
                    display: block;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    width: 4px;
                    height: 4px;
                    transform: translate(0, -50%);
                    border-radius: 100%;
                    background-color: rgba($color: #77e1fd, $alpha: 1);
                    z-index: 1;
                }
            }

            div {
                font-size: 14px;
                line-height: 18px;
                padding-left: 10px;
                margin-top: 10px;
                color: $color2;
            }

            .video-item {
                display: block;
                width: 240px;
                height: auto;
                border-radius: 10px;
                margin: 40px auto;
            }
        }
    }
}
</style>
