<template>
    <div>
    
    </div>
</template>

<script>
import common from '@/common/common'

export default {
    mixins: [ common ],
    //部件
    components: {},
    //静态
    props: {},
    //对象内部的属性监听，也叫深度监听
    watch: {},
    //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
    computed: {
        
    },
    //数据
    data(){
      return {
          domId: null,
          imgList: [
              require('../img/faq-1.jpg'),
              require('../img/faq-2.jpg').default,
              require('../img/faq-3.jpg').default,
              require('../img/faq-4.jpg'),
              require('../img/img-eco-nft.png'),
              require('../img/img-suite.jpg').default,
              require('../img/img-scene-1.png'),
              require('../img/img-scene-2.png'),
              require('../img/img-eco-metaverse.png').default,
              require('../img/img-mysterybox.png').default,
              require('../img/cat-1.png'),
              require('../img/cat-2.png'),
              require('../img/cat-3.png'),
              require('../img/cat-4.png'),
          ]
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        
    },
    //请求数据
    created() {
        this.domId = this.$route?.params?.id;
    },
    mounted() {
        if (this.domId) {
            const dom = `#${this.domId}`;
            document.querySelector(dom).scrollIntoView({
                behavior: "auto", // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
            });
        }
    },
}
</script>

<style scoped lang="scss">

</style>