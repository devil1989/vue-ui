/*
 @desc:输入一个数据结构，产生一张表格，表格附带某些功能，支持ajax或静态数据导入
    渲染流程：this.update > this.success > this.updateView(this.data中的属性)

 */

require("./index.scss");
var templates=require("./index.html");

export default {
    template:templates,
    data:function(){//template中获取的是这个数据
        return {//data里面存放和外界传入（父组件属性）没直接关系，却又需要通过props传入的数据处理成新的数据结构来渲染组件，类似于formatedData，用于渲染template；props类似于ajax参数
            ajaxFinish:true,//ajax请求是否完成
            ajaxState:0,//0表示ajax成功，1表示ajax失败
            currentPageNum:1,//获取第几页的表格数据
            sortColumn:"",//按照哪个属性排序
            sort:"",//ASC||DESC
            rows:[//表格数据，template靠这里的数据渲染表格
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
        };
    },
    props:{//父组件或者外部vue实例传入的数据
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

            //ajax请求发送前执行
            beforeAjax:function(){

            },

            //ajax请求发送后执行
            afterAjax:function(){

            },

            //通过外部api函数，获取剩下的其他ajax参数
            getQueryParam:function(){
                return {};
            },

            url:"/crm/sort",//ajax的url，url不存在的时候，忽略header，拿rows数据直接作为ajax返回的数据

            header:[{//表格头部属性
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

            rows:[[],[]],//表格所有属性，相当于data里面rows，没有url的时候，直接拿这个rows的数据作为data.rows数据，渲染页面

            hasCheckbox:true
        }
    },


    created:function(){
        var opts=this.options;

        if(this.options.beforeAjax){
            this.options.beforeAjax.bind(this)();
        }
        if(opts.url){
            this.update({
                sortColumn:this.sortColumn,
                sort:this.sort,
                currentPageNum:this.currentPageNum
            });
        }else{
            this.ajaxFinish=true;
            this.ajaxState=0;
            this.updateView({
                rows:this.options.rows
            });
        }
    },

    watch:{
        "options.url":function(url){//url修改后，表格重新渲染
            this.ajaxFinish=false;
            this.ajaxState=0;
            this.update({
                url:url
            });
        },

        "options.header":{
            deep:true,//监控内部对象
            handler:function(val,oldVal){

                this.update({
                    header:val
                });
            }
        },
        "options.rows":{
            deep:true,//监控内部对象
            handler:function(val,oldVal){
                this.updateView({
                    rows:val
                });
            }
        }
    },

    methods:{
        sortTable:function(column,column_index){//排序
            var keyName=column.key;
            var sort=column.sort;
            if(sort){
                this.update({
                    sortColumn:keyName,//按照某一列的属性排序
                    sort:(sort=="asc")?"desc":"asc",
                    currentPageNum:this.currentPageNum
                });
            }
        },

        //ajax请求成功
        success:function(data){
            this.ajaxFinish=true;
            this.ajaxState=0;
            this.updateView(data);
            if(this.options.afterAjax){
                this.options.afterAjax.bind(this)();
            }
        },

        //获取data数据失败
        error:function(){
            this.ajaxFinish=true;
            this.ajaxState=1;
            if(this.options.afterAjax){
                this.options.afterAjax.bind(this)();
            }
        },

        /*
         @desc：根据ajax返回的数据结构，进行格式化（header数据+aajx返回数据拼接），最后更新界面
         @data：ajax返回的数据结构
         */
        updateView:function(data){
            if(this.options.hasCheckbox){
                //header数据
            }
            this.rows=this.rows.concat(data);
        },

        /*
         @desc:根据参数重新发送请求，再渲染
         @param：传入的ajax参数,可以是部分
         */
        update:function(param){
            var extraParam=this.options.getQueryParam();
            var newParam=Object.assign(param,extraParam);
            $.ajax(Object.assign(newParam,this.success,this.error));
        }
    }
};


