/*
 @descrition：title组件，只是展示title，title内容可以用html字符串自定义
 */


import Common from "../v-basic" ;
require("./index.scss");
let templates=require("./index.html");

let Title = {
    data:function(){
        return {};
    },

    props:{
        //注意，v开头的属性是这个组件特有的属性，其他属性所有组件都有
        options:{//所有属性都是选填
            name:"Titles",//组件名称，可以再外面自定义
            v_closeName:"",//组件关闭文字，默认是x
            v_beforeClick:function(){},//点击关闭按钮之前执行的函数,里面的this就是vue组件对象，e就是对应的事件对象
            v_afterClick:function(){}//点击关闭按钮之后执行的函数,里面的this就是vue组件对象，e就是对应的事件对象
        }
    },

    // watch:{
    //     options:function(val){
    //         this.$data=val;
    //     }
    // },

    methods: {

        //需要给组件的事件添加生命周期，然后挂上scope
        closePop:function(e){
            var opts=this.options||{};
            if(opts.v_beforeClick){
                opts.v_beforeClick.bind(this)(e);
            }
            this.hide();
            if(opts.v_afterClick){
                opts.v_afterClick.bind(this)(e);
            }
        }
    },
    template:templates
};
Common.extend(Title);

export default Title

