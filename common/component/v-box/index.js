/*
 @descrition：title组件，只是展示title，title内容可以用html字符串自定义
 */


import Common from "../v-basic" ;
require("./index.scss");
let templates=require("./index.html");

let Pop = {
    data:function(){
        return {};
    },

    props:{
        //注意，v开头的属性是这个组件特有的属性，其他属性所有组件都有
        options:{//所有属性都是选填
            name:"Box"//组件默认名称是Pop，可以自定义
        }
    },

    methods: {},
    template:templates
};
Common.extend(Pop);

export default Pop

