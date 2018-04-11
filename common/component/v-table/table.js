require("./table.scss");
var templates=require("./table.html");
export default {
    template:templates,
    data:function(){//template中获取的是这个数据
        return this.$store.state.tables;
    },
    methods:{

    	//初始化，包含了数据请求
    	init:function(options){
    		var self=this;
    		var store=this.$store;
            this.options=options;
    		store.dispatch("getTableData",{"param":this.getTableParam()}).then(function(rst){
                if(rst.Status==0){
                	self.render(rst.Data);
                }
                else{
                    console.log("!!!请求节点数据失败");
                }
            },function(){
                console.log("网络原因请求节点数据失败");
            });//获取节点信息
    	},

    	//请求数据直接render，如果有已经获取的数据，可以直接render
    	render:function(originData){
    		var data=this.formatData(originData);

    		//格式化传过来的数据
            this.$store.commit({
                type:"initTable",
                data:data||{}
            });
    	},

    	//格式化数据，把需要展示的数据算出来
        formatData:function(data){
            if(!data||!data.pagination||!data.resultData){
                return {};
            }
            else if(this.options.pageNum>Math.ceil(data.pagination.totalCount/data.pagination.pageSize)){//当前页码大于总的页数
                this.options.pageNum=1;
            }

            var pageSize=data.pagination.pageSize;
            var totalPageNum = Math.ceil(data.pagination.totalCount/pageSize);
            var currentPage=this.options.pageNum;//第几页
            data.pagination.currentPageIndex=currentPage;//一般接口返回的页码和请求的页码肯定相等
            data.pagination.totalPageNum=totalPageNum;//一共有多少页
            data.pagination.jumpNum=1;//想要跳转到哪一页，input框中的数据

            data.formatedInfo=this.getPageArray(currentPage,data,totalPageNum);
            this.mapData(data.formatedInfo,currentPage);
            return data
        },

        //获取分页信息,把服务端的数组按照页面size分成多个数组
        getPageArray:function(currentPage,data,totalPageNum){
            var tgList=data.formatedInfo||[];
            var len=tgList.length;
            if(len>totalPageNum){
                tgList.splice(totalPageNum,(len-totalPageNum));//删除多出来的
            }
            for (var i = 0; i < totalPageNum; i++) {//totalPageNum最终需要生成的元素个数
                if(!tgList.length){
                    tgList.push({
                        pageIndex:i+1,
                        pageContent:(i!=(currentPage-1))?[]:data.resultData
                    });
                }else{
                    if(i>=len){
                        tgList.push({
                            pageIndex:i+1,
                            pageContent:(i!=(currentPage-1))?[]:data.resultData
                        });
                    }
                    else{
                        tgList[i].pageIndex=i+1;
                        tgList[i].pageContent=((i!=(currentPage-1)))?[]:data.resultData;
                    }
                }
            }
            return tgList
        },

        /*
         description:核心函数，处理页码的展示规则
         @param
         	data:原来的table数据，所有信息都是在一个list
			currentPageIndex:当前页码
			displayRange：当前页码左右展示几个可见得页码
         */
        mapData:function(formatedInfo,currentPageIndex,displayRange=1){
            var displayRange=displayRange;
            var totalPageNum=formatedInfo.length;//一共有多少页
            this.options.pageNum = currentPageIndex;
            
            (formatedInfo||[]).forEach(function(tgs,index,input){
                var ele=input[index];
                var idx=index+1;//当前是第几页
                ele.jumpClass=true;//是否需要跳转的class
                ele.isCurrent=(idx==currentPageIndex)?true:"";//元素是否是当前页
                ele.noHover=false;//元素是否需要hover效果
                ele.isShow=false;//是否展示元素
                ele.txt="";//元素的展示内容
                // if(!ele.pageContent){
                //     ele.hasNoData=true;//这个用来判断是否有对应数据
                // }

                if(currentPageIndex<=displayRange+2){//从1到currentPageIndex之间没有...,展示1~currentPageIndex+2，
                    if(idx>0&&(idx<=currentPageIndex+displayRange)){
                        ele.txt=idx;
                        ele.isShow=true;
                    }
                    else{//看剩下的页码怎么展示

                        if(idx==totalPageNum-1){
                            ele.txt="...";
                            ele.noHover=true;
                            ele.jumpClass="";
                            ele.isShow=true;
                        }
                        else{//中间隐藏的元素
                            ele.txt=idx;
                            ele.isShow=false;
                            if(idx==totalPageNum){
                                ele.isShow=true;
                            }
                        }
                    }
                }else{//大于4的时候，结构很稳定了1...current-2,current-1,current,current+1,current+2,
                    if(idx==1){
                        ele.txt=idx;
                        ele.isShow=true;
                    }
                    else if(idx==2){
                        ele.txt="...";
                        ele.isShow=true;
                        ele.noHover=true;
                        ele.jumpClass="";
                    }
                    else if((idx>=(currentPageIndex-displayRange)&&idx<=(currentPageIndex+displayRange))){//区间内都展示
                        ele.txt=idx;
                        ele.isShow=true;
                    }else{//区间外，如果后面还有2个或以上元素，第一个元素变...
                        if(totalPageNum>currentPageIndex+displayRange+1){//currentPageIndex在页面中间，那么最后面有...和最后一页
                            if(idx==totalPageNum-1){
                                ele.txt="...";
                                ele.noHover=true;
                                ele.isShow=true;
                                ele.jumpClass="";
                            }
                            else if(idx==totalPageNum){
                                ele.txt=idx;
                                ele.isShow=true;
                            }
                            else{//中间隐藏的元素
                                ele.txt=idx;
                                ele.isShow=false;
                            }
                        }else{//currentPageIndex在页面最后3个元素中的其中一个，中间没...,,所以最后的数字展示比较特殊
                            if((idx>=(currentPageIndex-displayRange)&&idx<=(currentPageIndex+displayRange+1))){
                                ele.txt=idx;
                                ele.isShow=true;
                            }
                            else{
                                ele.txt=idx;
                                ele.isShow=false;
                            }
                                
                        }
                    }
                }

            });
        },

        //跳转到table的某个tab分页
    	jumptopage:function(e){
    		var targetEle=e.target;
    		var hasClass=hj.hasClass;
    		var targetPageNum;
    		//点击有js_jump_to_page的li元素或者它的子元素，或者是确定按钮
    		if(hasClass(targetEle,"js_confirm_btn")){
    			targetPageNum=targetEle.getAttribute("data-num")-0;
    		}
    		else if(hasClass(targetEle,"js_jump_to_page")||hasClass(targetEle.parentNode,"js_jump_to_page")){//||hasClass(e.target,"js_jump_to_page")
    			targetPageNum=e.target.innerHTML.match(/\d{1,}/g)[0]-0;
    		}

    		if(targetPageNum&&targetPageNum>0&&targetPageNum<=this.data.pagination.totalPageNum){

                //重新渲染table
                this.init({
                    id:hj.spaIns.getCurrentScene(),
                    pageNum:targetPageNum
                });
				// this.$store.commit("jumpToTargetPage",{
				// 	currentPageIndex:targetPageNum,
				// 	callback:this.mapData
				// });
    		}
	    		
    	},
    	

    	//获取底部table请求所需要的参数
        getTableParam:function(options){
            return {
                "isMock":false,
                "mockUrl":"index-mock.js?case=case1",
                "url":"crm/OrganizationV2/GetMember",
                "type":"post",
                "data":{
                    "pageNum": this.options.pageNum||1,//页码
                    "pageSize": 10,//每页多少个
                    "paramData": {
                      "groupId": this.options.id //节点id
                    }
                }
            }
        }
        
    }
};


