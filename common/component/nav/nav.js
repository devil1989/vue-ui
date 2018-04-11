/*
 *折叠导航栏param
    wrapper:document.getElementById("app"),//【可不传,默认为body】 nav插入哪个父元素
    autoFold:true,//【可不传】点击文件夹的时候，是否自动打开文件夹
    foldClass:"",//【可不传】 给折叠元素添加的class
    unfoldClass:"",//【可不传】 给非折叠元素添加的calss
    beforeMounte:function(){},//【可不传】 nav插入父元素之前的执行函数
    mounted:function(){},//【可不传】 nav插入父元素之后的执行函数
    switchScene:function(pageId){},//【可不传】切换场景（切换页面）的时候，需要执行还函数实现页面跳转
    pageId:5,//某个特定页面的page名称
    nodeList: [{//
        "id": 1, //这个节点的id，他和页面名称一一对应，每一个id匹配一个页面；如果没有下发ID，那么久自动格式化的时候设置一个
        "nodeName": "网校", //展示的名称
        "isFold": false, //【可不传】是否折叠,false表示不折叠，默认都不折叠
        "isUnAction": false, //【可不传】是否激活（为false，表示该节点和所有子节点都未激活，用灰色或其他颜色表示）
        "nodeType": "1", // 【可不传】 表示节点类型，1：业务域，2：机构，3：业务单元，4：职能单元，5：职能组，6：职能小组
        "children": [{ //【可不传】 有child说明他是个文件夹，否则就只是一个链接
            "id": 2,
            "isFold": false,
            "isUnAction": false,
            "nodeName": "机构-沿途",
            "nodeType": "4",
            "children": [{
                "id": 3,
                "isFold": false,
                "isUnAction": false,
                "nodeName": "业务单元A",
                "nodeType": "4",
                "children": []
            }, {
                "id": 14,
                "isFold": false,
                "isUnAction": false,
                "nodeName": "业务单元B",
                "nodeType": "4",
                "children": []
            }]
        }, {
            "id": 15,
            "isFold": false,
            "isUnAction": false,
            "nodeName": "机构-2",
            "nodeType": "4",
            "children": []
        }]
    }]

    每个节点会添加以下参数
    
 */

require("./nav.scss");

let Nav=function(options){
    this.opts=options;
    this.formatData(options.nodeList||[]);
    this.update(options);
    this.bindEvents();
}

Nav.prototype={
    genarateTemplate:function(nodeList){//目录结构层数没有限制，所以得动态拼接了，这个导航的template太坑（用vue的template完全没法写）
        var startStr='<div class="internet-school-nav"><ul class="school-content-item space-indent-1 ">';
        var endStr='</ul></div>';
        return startStr + this.getUnitHtml(nodeList||[],this.getCurrentScene()) + endStr;
    },

    getCurrentScene:function (argument) {
        return location.hash.substr(1);//当前的页面id
    },

    getUnitHtml:function(nodeList,currentScene){//树是递归嵌套的，html也需要递归嵌套
            var htmlStr="";
            var len=nodeList.length;
            
            for (var i = 0; i < len; i++) {
                var ele=nodeList[i];
                var hasChild=ele.children&&ele.children.length;//没有子节点的时候，不需要展示+号
                var isCurrent;//是否当前选中tab
                var isFold;//该栏目是否折叠
                var liClass;//是否是第一个元素
                var activeClass;
                var endStr="</ul></li>";
                var typeClass=" "+ele.className||"";
                if(i==0){
                    liClass="line-start";
                }else if(i==len-1){
                    liClass="line-end"
                }
                isCurrent = (currentScene==ele.id )?" current-nav":"";//url没有sceneid，默认都选择第一个否则根据url还判断选中哪个

                isFold = ele.isFold?("fold-item "+(this.opts.foldClass||"")):("unfold-item "+(this.opts.unFoldClass||""));//后端没下发，所以都展开
                activeClass=ele.isUnAction?"unactive":""

                htmlStr+='<li class="'+liClass+' '+isFold+(!hasChild?" have-no-child":"")+activeClass+'">'+
                            '<div data-child="'+(hasChild?"yes":"")+'" class="school-nav js_current_scene'+activeClass+isCurrent+typeClass+' " data-id="'+ele.id +'" >'+
                                '<i class="dashline-absolute-top'+activeClass+'"></i>'+
                                '<i class="dashline-absolute-bottom'+activeClass+'"></i>'+
                                '<i class="dashline-absolute-left'+activeClass+'"></i>'+
                                '<span class="reduce-icon float-left fold-icon'+activeClass+' js_fold_icon js_reduce_icon">-</span>'+
                                '<span class="plus-icon float-left fold-icon'+activeClass+' js_fold_icon js_plus_icon">+</span>'+
                                '<h3 data-child="'+(hasChild?"yes":"")+'" class="float-left js_current_scene'+activeClass+'" data-id="'+ ele.id +'">'+ele.nodeName+'</h3>'+
                            '</div>'+
                            '<ul class="school-content-item space-indent-1 ">';

                htmlStr+=(hasChild?(this.getUnitHtml(ele.children||[],currentScene)):"")+endStr;//递归调用，核心代码
            }

            return htmlStr
    },

    //只更新内容，不绑定事件
    update:function(){
        var options=this.opts;
        if(options.beforeMounte){
            options.beforeMounte(options);
        }
        if(options){
            (options.wrapper||document.body).innerHTML=this.genarateTemplate(options.nodeList);
        }
        if(options.mounted){
            options.mounted(options);
        }
    },

    //递归调用，把父元素isActive为0 ，则设置所有子元素isAcitve 为0
    formatData:function(nodeList){
        var self=this;
        nodeList.forEach(function(ele,idx,input){
            input[idx].id=input[idx].id||(new Date()+Math.random());
            input[idx].isFold=(input[idx].isFold==undefined)?true:input[idx].isFold;//默认为折叠
            var hasChild=input[idx].children&&input[idx].children.length;//没有子节点的时候，不需要展示+号
            if(hasChild){
                if(input[idx].isUnAction){//禁用所有子元素
                    input[idx].children.forEach(function(unit,index,subInput){
                        subInput[index].isUnAction=true;
                    });
                }
                self.formatData(input[idx].children);
            }
        });
    },

    checkValidClick:function(e){
        var target=e.target;
        return !hj.hasClass(target,"unactive");
    },

    //绑定事件
    bindEvents:function(){
        var self=this;
        if(this.opts.wrapper){
            this.opts.wrapper.addEventListener("click",function(e){
                if(self.checkValidClick(e)){
                    self.toggleFold(e.target);
                    self.toggleScene(e.target);
                }
            });
        }
           
    },


    //通过id来折叠文件夹
    /*
     isFold:是否折叠，true为折叠，false为展开
     */
    toggleFoldById:function(id,isFold){
        this.updateOptions(this.opts.nodeList,id,isFold);
        this.update();
    },

    toggleFold:function(target){
        var ele=target;
        var id=ele.parentNode.getAttribute("data-id");
        if(hj.hasClass(ele,"js_fold_icon")){
            this.toggleFoldById(id,hj.hasClass(ele,"js_plus_icon")?false:true);
        }else{
            if(this.opts.autoFold&&hj.hasClass(target,"js_current_scene")){
                this.toggleFoldById(id,false);
            }
        }
    },
    
    //切换到对应的场景
    toggleScene:function(target){
        if(hj.hasClass(target,"js_current_scene")){
            var sceneId=target.getAttribute("data-id")||"";
            var hasChild=!!(target.getAttribute("data-child")||"");

            //hasChild：是否有子元素；sceneId：切换的场景id
            this.opts.switchScene&&this.opts.switchScene.bind(this)(sceneId,hasChild);
        }
    },

    //把树结构中所有节点id为传入id的时候，设置这个节点为折叠
    updateOptions:function(nodeList,id,isFold){
        var self=this;
        if(nodeList||[]){
            nodeList.forEach(function(ele,idx,input){
                if (ele.id==id) {
                    input[idx].isFold=isFold;
                }
                if(ele.children&&ele.children.length){
                    self.updateOptions(ele.children,id,isFold);
                }
            });
        }
    }

}



export default {Nav}