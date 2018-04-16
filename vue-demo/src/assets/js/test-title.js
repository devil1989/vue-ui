// import Title from 'v-title';//引用其他公共的组件或者js文件
// import Box from 'v-box';
import components from "index.js"
// Vue.config.devtools = true;

// let loginPageVue=new Vue({

//     el: '#app', //this.$el来获取这个元素

//     data:function(){//this.$data来获取
//     	return {
//     		pop:{//传入pop组件数据
//                 name:"Title",//动态组件名称
//                 display:"show",
//                 validate:function(){//校验是否通过

//                 },
//                 children:"<ul><li>12</li><li>34</li></ul><p>789654</p>",//内部组件，如果不需要组件，可以用string作为内部的html
//                 v_closeName:"",//组件关闭文字，默认是x
//                 v_beforeClick:function(){
//                 },
//                 v_afterClick:function(){
//                 }
//     		}
//         }
//     },
//     beforeCreate:function(){
//         //如何使用
//         var title=Vue.component("Titles",Title);//默认是自定义的名称
//     }

// });

// let boxDemo=new Vue({

//     el: '#app-box', //this.$el来获取这个元素

//     data:function(){//this.$data来获取
//         return {
//             /*
//              desc:name,className,destroy,hide,inner是所有组件的通用属性
//              */
//             pop:{//传入pop组件数据
//                 name:"Box",//动态组件名称
//                 className:"jeffrey",
//                 children:"<ul><li>12</li><li>34</li></ul><p>789654</p>",//内部组件，如果不需要组件，可以用string作为内部的html
//             }
//         }
//     },
//     beforeCreate:function(){
//         //如何使用
//         var box=Vue.component("Box",Box);//默认是自定义的名称
//     }

// });

let table=new Vue({

    el: '#app-box', //this.$el来获取这个元素

    data:function(){//this.$data来获取
        return {
            table:{//传入pop组件数据
                className:"jeffrey",//header的class
                displayColumn:function(column, column_index){//根据列的信息，判断列是否展示,一般通过列的序号，或者列的具体属性，判断是否展示某列
                    return true;
                },
                displayRow:function(row, row_index){//根据行的数据信息，判断特定行不展示，一般通过行序号判定
                    return true;
                },

                setRowClass:function(row, row_index){//设置特定行class
                    return "jef"
                },

                setColumnClass:function(column, column_index){//设置列class
                    return "dev"
                },  

                beforeSort:function(){//点击排序前

                },
                afterSort:function(){//点击排序操作以后

                },

                rows:[
                    //第一个数组，也就是table的header()
                    [{
                        'key': 'name',//列的key，确定列的唯一性
                        "sort":false,//有值表示支持排序，"asc"升序，"desc"降序,
                        "value": "姓名"//列的值
                        // "value":{//table内嵌组件
                        //     "type":"input-text",
                        //     "options":{}//该组件的参数
                        // }
                    }, {
                        "sort":"asc",
                        'key': 'age',//列的key，确定列的唯一性
                        "value": "年龄"//列的值
                    }],

                    //第二个数组，就是table的body主体中的一行行的数据
                    [{
                        key:"name",//列的key，确定列的唯一性
                        value:"jeffrey"
                    },{
                        key:"age",
                        value:"24"
                    }],[{
                        key:"name",//列的key，确定列的唯一性
                        value:"jeffrey"
                    },{
                        key:"age",
                        value:"25"
                    }],[{
                        key:"name",//列的key，确定列的唯一性
                        value:"jeffrey"
                    },{
                        key:"age",
                        value:"26"
                    }],[{
                        key:"name",//列的key，确定列的唯一性
                        value:"jeffrey"
                    },{
                        key:"age",
                        value:"27"
                    }]
                ]
            },
            pagination:{//如果属性要用到，哪怕暂时不用后续用到，也要给个初始值
                totalPageNum:10,//共几页 *
                currentPageIndex:5,//当前第几页 *
                switchPage:function(e,currentIndex,originIndex){//事件,跳转目标页面序号,原来页面序号
                }
            }
        }
    },
    beforeCreate:function(){
    }
});

// table.$refs.pagination.updateView({totalPageNum:20})

export default {}