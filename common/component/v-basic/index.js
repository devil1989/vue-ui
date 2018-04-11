/*
 @name：jeffreyUI
 @author：chenjiajie
 @time：2018/04/08
 @description：个人Vue的UI组件库，兼容性IE9+，目的是给B端公司后台做统一便捷的UI库

 组件如何插入到业务代码中去：
    1.在js中添加组件import组件，并且使用组件，例如：import Pop from 'pop'; pop=Vue.component('Pop',Pop);
    2.html中添加组件的标签，第一步中已经定义标签为Pop;


 组件思考：
    1.可扩展性（继承性：内部添加动态组件【is来添加动态组件】，或者用extend+$mount来挂载】）
    2.可使用性：生命周期要比较全，内部简易可用的api接口；做成node_module组件库，用npm调用；组件可以单独调用，也可以一次性全部加在调用
    3.可维护性：组件之间不相互依赖，一个组件修改升级不影响其他组件的使用
    4.可读性：具体的API+简易demo
    5.安全性：组件内部传入值不允许html，容易导致xss攻击，sql注入等（其实这个没办法预防，随便伪造一个请求就可以了，个人觉得没啥用）
    6.国际化：i18n（暂时不做，其实没什么东西，就是中英文相互转换）
    7.主题切换：theme(后续添加scss，暂时不动，可以用bootstrap做)

    备注：   一般Vue开发，可以把多个基础组件直接平铺在页面上；也可以把基础组件集成在一起，写出一个大的业务组件；还可以在基础组件里面再内嵌组件从而实现组件的继承
            组件应该是一个类，可以创建多个实例（vue中多个实例，其实就是把这个component放在各个vue组件或者vue对象中引入）
            组件嵌套使用有个大前提：使用语法得一致，有一个估计的数据结构来实现组件相互嵌套调用

    jeffreyUI组件概念：组件可分为块组件和行内组件，块组件有inner属性，可以内嵌子组件【具体样式得自己调整】（目前做法是，行内组件添加了inner，会自动忽略inner属性）


  */

//组件的公共接口方法和属性
require('./index.scss');//ui组件库公共的scss
let Basic = {

    props:{
        options:{//所有组件默认的props属性，每个组件都有这些属性，值后面会重新定义
            name:"Unit",//组件名称
            className:"",//组件最外部的class
            display:"destroy",//destroy:销毁，hide：隐藏，其他都是展示出来
            children:"",//内部组件，如果不需要组件，可以用string作为内部的html，组件通过[{组件内容}]来嵌套使用
            validate:function(){//校验是否通过，默认不校验
                return true;
            }
        }
    },

    methods:{//所有组件的公共方法
        show:function(){
            this.options.display="";
        },

        hide:function(){
            this.options.display="hide";
        },

        destroy:function(){
            this.options.display="destroy";
        }
    },

    //拓展方法，Basic的props.options和methods作为默认值赋给其他组件
    extend:function(component){
        component.methods=Object.assign(this.methods,component.methods);
        component.init=this.init;
        component.initChildren=this.initChildren;
        component.props.options=Object.assign(this.props.options,component.props.options);
    },

    //把内部所有组件对象都注册为全局组件（ Vue.component），同时返回传入的那个componentObj
    init:function(componentObj,noneOutPut){
        // var children=componentObj.children;
        // var len=(Object.prototype.toString.call(children)=="[object Array]")?children.length:0;
        var component=Vue.component(componentObj.name||(+new Date()),componentObj);//默认是自定义的名称
        // debugger
        // if(children&&len){
        //     for (var i = 0; i < len; i++) {
        //         this.init(children[i],true);//递归调用
        //     }
        // }

        // if(!noneOutPut){
            return componentObj;
        // }
    },

    //初始化所有子组件
    initChildren:function(children){
        var len=children.length;

        //unfinish,需要根据name相同做匹配
        for (var i = 0; i < len; i++) {
            Things[i]
        }
        var title=Vue.component(this.$props.options.children[],Title);//title组件需要自定义
        var box=Vue.component(Box.props.options.name,Box);//box组件自定义
    }
        
};
export default Basic

