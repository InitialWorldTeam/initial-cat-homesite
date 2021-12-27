<template>
    <div>
    
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
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
        ...mapState([
            'navList',
            'curNav'
        ]),
        ...mapGetters([
            'curWallet'
        ])
    },
    //数据
    data(){
      return {
          isShowMenu: false,
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        ...mapMutations([
            'setCurNav'
        ]),
        goToNav(item) {
            if (item.path) {
                const e = event.target;
                const LEFT = e.offsetLeft + e.clientWidth / 2;
                this.$refs.navLine.style.left = LEFT + 'px';
            }
            this.goToPage(item);
        },
        goToPage(item) {
            this.isShowMenu = false;
            $("body").removeClass("disable");
            if(!item) {
                return false;
            }
            this.setCurNav(item?.name);
            if (!item.path || this.$route.path === item?.path) {
                return false;
            };
            this.$router.push({
                path: item.path
            });
        },
        handleShowMenuModal() {
            this.isShowMenu = true;
            $("body").addClass("disable");
        }
    },
    //请求数据
    created() {},
    mounted() {},
}
</script>

<style scoped lang="scss">

</style>