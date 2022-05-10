<template>
    <div class="container-introduction">
        <div class="box-left">
            <h1>ABOUT INITIALWORLD</h1>
            <p>InitialWorld is a coordinated Metaverse Connector based on blockchain. NFT will be used as a core asset for cross-metaverse transfer.</p>
            <p>At InitialWorld, we will build a stream of low-barrier technical tools to help studios and users easily create SubMetaverse and NFT, allowing simple integration into all Metaverse via Initial World.</p>
            <p>SubMetaverse is made by InitialWorld Team and its partners based on the InitialStudio being developed. Users can use InitialCat 3D to travel among them. When InitialStudio is fully developed, you can use InitialStudio to easily create your own SubMetaverse and share it with other users.</p>    
        </div>

        <div class="box-right">
            <img :src="imgPc" alt="">
        </div>
    </div>
</template>

<script>
import Base from './base';

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
    data(){
      return {
          
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {},
    //请求数据
    created() {},
    mounted() {}
}
</script>

<style scoped lang="scss">
.container-introduction {
    display: flex;
    justify-content: center;
    padding-top: 94px;
    color: #545356;

    .box-left {
        width: 492px;
        margin-right: 70px;
        padding-top: 20px;

        h1 {
            font-size: 28px;
            font-weight: bold;
            line-height: 32px;
            margin-bottom: 36px;
        }

        p {
            font-size: 14px;
            font-weight: 400;
            line-height: 24px;

            &:not(:last-child) {
                margin-block: 20px;
            }
        }
    }

    .box-right {
        width: 218px;
        
        img {
            display: block;
            height: auto;
        }
    }
}
</style>
