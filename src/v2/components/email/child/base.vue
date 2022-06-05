<template>
    <div>
    
    </div>
</template>

<script>
import common from "@/common/common";
import preventDoublePress from "@/config/preventDoublePress";
import UTILS from "@/config/util";
import mailApi from "@/config/mailApi";

export default {
    mixins: [common],
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
          placeholderText: 'Your e-mail address',
          userEmail: "",
          subscribeEmailTip: {
            tip1: "Please input your email",
            tip2: "Your email address is missing @",
            tip3: "Please enter the part after @",
            tip4: "Please provide a valid email address.",
            tip5: "Thank you, your sign-up request was successful! ",
            tip6: "Something error, please try again"
          },
      }
    },
    //方法表示一个具体的操作，主要书写业务逻辑；
    methods: {
        preventDoublePress(callback, delay = 1500) {
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
            this.$toast({
                message: msg,
                className: this.isApp ? 'commonToast-2' : '',
            });
        }
    },
    //请求数据
    created() {},
    mounted() {},
}
</script>

<style scoped lang='scss'>

</style>