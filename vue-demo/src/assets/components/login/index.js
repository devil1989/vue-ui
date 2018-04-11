require("./index.scss");
var templates=require("./index.html");
let Login = Vue.component('Login',{

    //vue的数据
    data:function(){
        return {}//this.props||
    },

    props:{
        options:{}
    },

    //vue 计算属性
    computed: {
        //这个其实也算是data中的属性，展示他会随着其他属性的变化而变化
        fullName: function() {
            return this.firstName + this.lastName;
        },
        sex: {
            //获取的时候计算
            get: function() {},

            //重新设置的时候计算
            set: function() {}
        }
    },

    //vue 监听属性
    watch: {
        options:function(val){
            this.$data=val;
        }
    },

    //vue的方法对象，可以放一些业务类的方法
    methods: { //this.$options.methods来获取

        loginPage: function() {
            this.options.loginClick.bind(this)();
        }
    },
    template:templates
});

export default Login