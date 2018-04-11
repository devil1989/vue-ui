/*
 @name：jeffreyUI
 @author：chenjiajie
 @time：2018/04/08
 @description：个人Vue的UI组件库，兼容性IE9+，目的是给B端公司后台做统一便捷的UI库

 组件如何插入到业务代码中去：
    1.在js中添加组件import组件，并且使用组件，例如：import Pop from 'pop';
    2.在data里面的组件最外层对象用init函数执行Pop.init
    3.html中添加组件的标签，第一步中已经定义标签为Pop;


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
import Common from "../v-basic" ;
import Title from "../v-title" ;
import Box from "../v-box" ;

require("./index.scss");
let templates=require("./index.html");
let Pop = {

    //基础数据，任何属性变动，都会触发beforeUpdate和updated方法，导致DOM重新渲染（中间有个虚拟DOM的优化性能）
    data:function(){
        return {};
    },

    //依赖data数据中的基本属性的符合属性，它们有data里面的基本属性组合而成，其中一个变了，他所在的组合属性自动会更新，重新渲染dom，和data类似
    computed：{
        //computed内部属性和data内部属性不能同名重复，可以把computed最为一个data的子类来理解，有data的所有功能，同时还有任意data属性变动导致computed属性自动更新的功能
    },

    //数据变化是执行异步操作（ajax请求）或者开销较大时使用，其实这个功能完全可以再methods中的方法中实现
    /*watch属性和data中的属性是对应的，不能和cmputed的属性重复，一旦data中的某个属性发生改变，不会立即触发beforeUpdate和updated方法导致dom更新，
      而是调用watch的函数，执行复杂的操作或者异步操作以后，watch函数手动赋值给data中的属性，实现data修改；
      其实也可以不用watch，在操作的时候，直接在事件里面直接计算获取最新的data的属性值，然后赋给data，就好了
     */
    watch:{
        
        options:function(newValue,oldValue){
            this.$data=val;
        }
    },

    //props和data，computed中的属性一样，可以在模板中直接使用，同时更新的时候，对应的dom会更新
    //props传递给子组件，父组件props更新的时候，子组件也会更新
    //（vue默认是单向数据流：每次父组件更新时，子组件的所有 prop都会更新为最新值，子组件props不应该修改，而是通过修改父组件的props）
    // 核心概念：父子组件之间的信息传递以及props作用，非props属性作用
    props:{
        options:{//所有属性都是选填
            name:"Pop"//组件默认名称是Pop，可以自定义
        }
    },

    

    


    /*生命和周期 start*/
    beforeCreate:function(){// this.$data和this.$el为null
         /*初始化所有子组件，用is插入子组件的前提是：子组件再根组件初始化实例之前已经注册【Vue.component】完成，
         （根组件的components添加子组件对象，也能在根组件初始化之前把子组件注册【Vue.component】完成）
          想要使用无限制的children，children的个数和对应属性是通过外部传入，然后按照children的顺序和import的子组件匹配name，匹配上就注册全局组件
         */
        this.initChildren(this.$props.options.children||[]);
    },

    // created:function(){
    //      //this.$data 已经保存
    // },

    // 
    // beforeMount:function(){//this.$el被初始化
        
    // },

    // mounted:function(){
    // },

    // beforeUpdate:function(){
    // },

    // updated:function(){
    // },

    // beforeDestroy:function(){
    // },

    // destroyed:function(){
    // },
    /*生命和周期 end*/

    methods: {

        clickBtn:function(idx){
            var btns=this.options.btns;
            if(btns&&btns[idx]){
                if(btns[idx].callback){
                    btns[idx].callback.bind(this)();//scope绑定
                    if(btns[idx].autoClose){
                        this.hide();
                    }
                }
            }
        }
    },
    template:templates,

    inner:[Title,Box] //和basic紧密耦合了
};

var s=Common;
Pop=Object.assign(Common,Pop);

export default Pop



// 在设计组合使用的组件时，内容分发 API 是非常有用的机制。