require("./index.scss");
var templates=require("./index.html");

export default {
    template:templates,
    data:function(){
        return {//在template中渲染，但是不依赖父组件传输的数据，得写在data里面
        	pageArray:[1]
        };
    },
    props:{
        "options":{
    		totalCount:100,//总几条 *
        	totalPageNum:1,//共几页 *
        	currentPageIndex:1,//当前第几页 *
        	jumpNum:1,//跳转到第几页（跳转输入框内的值） 
        	switchPage:function(totalPageNum){//跳转到对应页面
        	}
        }
    },

    watch:{
    	//监控props中的options.currentPageIndex属性
    	"options.currentPageIndex":function(val,oldVal){
    		this.updatePageArray(val);
    	}
    },

    // beforeCreate:function(){
    // 	debugger

    // },
    created:function(){
    	this.updatePageArray(this.options.currentPageIndex);
    },


    methods:{
        jumptopage:function(targetPageNum){
        	if(typeof targetPageNum==="number" &&targetPageNum<=this.options.totalPageNum&&targetPageNum>0){
        		this.options.currentPageIndex=targetPageNum;
	        	this.options.switchPage&&this.options.switchPage(targetPageNum);//执行传入的回调函数，跳转到对应页面
        	}
	        	
        },

        //根据传入的currentPageIndex，来获取新的pageArray，更新页面
        updatePageArray:function(val){
        	this.pageArray.splice(0,this.pageArray.length);//清空数组
    		var displayLen=3;//当前页前后共展示3个可跳转页面;最开始和最后只展示1个页码
    		var pageArray=[];
    		var startIndex=1;
    		var totalPageNum=this.options.totalPageNum;
    		var currentPageIndex=val;
    		if(currentPageIndex>(startIndex+2)&&currentPageIndex<(totalPageNum-2)){//
    			pageArray=[1,"...",currentPageIndex-1,currentPageIndex,currentPageIndex+1,"...",totalPageNum];
    		}else if(currentPageIndex>(startIndex+2)){
    			pageArray=[1,"...",totalPageNum-2,totalPageNum-1,totalPageNum];
    		}else if(currentPageIndex<(totalPageNum-2)){
    			pageArray=[1,2,3,"...",totalPageNum];
    		}else{
    			while(totalPageNum){
    				pageArray.push(totalPageNum);
    				totalPageNum--;
    			}
    			pageArray.reverse();
    		}
    		this.pageArray=this.pageArray.concat(pageArray);
        }
    }
};