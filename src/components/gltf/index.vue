<template>
    <div>
        <div class="dropzone"></div>
        <div class="spinner"></div>
    </div>
</template>

<script>
import gApp from './app.js';
export default {
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
      return {}
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {},
    //请求数据
    created() {},
    mounted() {
        const app = new gApp(document.body, location);

        // 加载Gltf
        // let url = 'https://rmrk.mypinata.cloud/ipfs/bafybeihfwwnr77s2puuzmdlxwc6gb56j7f5hvk4vzc6zd63kanluvfsghi';
        // let url = 'https://test-initialworld.mypinata.cloud/ipfs/bafybeicxwe67wjcdmryrvmno5tyfscxwvhenbxjpwi62p2jlybyw3pzjxy';
        // let url = require('./1.gltf').default;
        // app.view(url);

        // 加载fbx
        // let url = require('./cat.fbx').default;
        let url = "https://test-initialworld.mypinata.cloud/ipfs/bafybeicyudydmtuidjae5w4h7nbbiaiordh5esvc3aso5nfgtqqatftofi";
        app.view(url, 'fbx');
    },
}
</script>

<style scoped>
.dropzone {
    width: 100vw;
    height: 100vh;
}
</style>
