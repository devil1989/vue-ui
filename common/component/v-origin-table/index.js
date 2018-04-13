/*
 @desc:table原生组件，没有ajax
 */

require("./index.scss");
var templates=require("./index.html");

export default {
    template:templates,
    data:function(){//template中获取的是这个数据
        return {};
    },
    props:{
        options:{
            className:"jeffrey",//最外面的class

            //展示特定列
            displayColumn:function(column, column_index){//根据列的信息，判断列是否展示,一般通过列的序号，或者列的具体属性，判断是否展示某列
                return true;
            },

            //展示特定行
            displayRow:function(row, row_index){//根据行的数据信息，判断特定行不展示，一般通过行序号判定
                return true;
            },

            //设置特定行的class
            setRowClass:function(row, row_index){

            },

            //设置特定列的class
            setColumnClass:function(column, column_index){

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
                }]
            ]
        }
    },
    methods:{
        sort:function(column,column_index){//排序
            // var keyName=column.key;
            // var sort=column.sort;
            // if(sort){
            //     this.update({
            //         sortColumn:keyName,
            //         sort:(sort=="asc")?"desc":"asc",
            //         currentPageNum:this.currentPageNum
            //     });
            // }
        },
        // update:function(){
            
        // }
    }
};


