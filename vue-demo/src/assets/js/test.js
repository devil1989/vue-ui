// //vue使用demo：没有用到vuex
// import Pop from 'v-pop';//引用其他公共的组件或者js文件


// Vue.config.devtools = true;

// let loginPageVue=new Vue({

//     el: '#app', //this.$el来获取这个元素

//     data:function(){//this.$data来获取
//     	return {//初始化pop信息，命名Pop，以及执行Vue.component("Pop",Pop)

//     		pop:Pop.init({//传入pop组件数据
//                 name:"Pop",//组件名称[确保唯一性，作为子组件时候，是这个名称，如果拿来做在外层组件，可以通过Vue.component来自定义名称]
//                 className:"pop-test",//组件最外部的class
//                 validate:function(){//校验是否通过

//                 },

//                 //子组件集合[按照顺序展示在组件内部]
//                 children:[//嵌套动态子组件【是个列表，这个高级技能，内部可以嵌套任何其他组件，但是组件之间的样式影响要自己调整，因为不知道嵌套的是哪些组件】
                    
//                     //title组件
//                     {
//                         name:"Titles",//动态组件名称，必须和组件中的名称一致
//                         rename:"title1",//因为一个相同的组件，可以多次使用，所以需要重命名，如果只用到一次，可以不用这个rename
//                 		display:"show",
// 		                children:"<ul><li>12</li><li>34</li></ul><p>789654</p>",//内部组件，如果不需要组件，可以用string作为内部的html
// 		                v_closeName:"",//组件关闭文字，默认是x
// 		                v_beforeClick:function(){
// 		                },
// 		                v_afterClick:function(){
// 		                }
//                     },

//                     //中间部分组件
//                     {
//                         name:"Box",//动态组件名称
//                         children:"<p>789654</p><div>jeffreychen</div>",//自定义内部内容，内部没有交互，只有css样式和内容展示的时候，用string，否则就用下面的动态子组件
//                     }
//                 ],

//                 //form的底部的按钮
//                 v_btns:[{
//                 	type:"submit",
//                     txt:"确认",
//                     callback:function(e){//点击按钮
//                         // this.hide();
//                     }
//                 },{
//                 	type:"cancel",
//                     txt:"取消",
//                     callback:function(e){
//                         // this.hide();
//                     }
//                 }]
//     		})
//         }
//     },
//     beforeMount:function(){
//         //如何使用
//         // var pop=Vue.component("Pop",Pop);//默认是自定义的名称
//     },

//     mounted:function(){
//     },




//     //vue的方法对象，可以放一些业务类的方法
//     methods:{//this.$options.methods来获取

//     }

// });

// export default {}








// options:{
//     columns: [
//         [{
//             "className":"",//列的class
//             'key': 'name',//列的key，确定列的唯一性
//             "value": "姓名",//列的值
//             "enableSort": true,//列是否支持排序
//             "displayCondition":function(){},//列是否展示
//             "children":{//table内嵌组件
//                 "type":"组件类型名称",
//                 "options":{}//该组件的参数
//             }
//         }, {
//             'key': 'age',
//             "value": "年龄",
//             "displayCondition":function(){},
//             "enableSort": true
//         }]
//     ],

//     columns:[],//通过ajax生成类似columnsHeader的
//     // url:"/data/get",
//     getExtraQuery:function(){
//         return {
//             sort:"asc",
//             sortColumn:"age",
//             currentPageNum:5
//         }
//     }
// }