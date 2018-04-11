require("../styles/demo.scss"); //每个js对应该页面的一个css
import Nav from 'nav/nav.js';//引用其他公共的组件或者js文件

Vue.config.devtools = true;

let loginPageVue=new Vue({
	//这个对象里面所有的属性，都可以通过this.$options来获取


	//vue的root元素
    el: '#app', //this.$el来获取这个元素

    //vue的数据
    data:function(){//this.$data来获取

    	//所有的vue组件（包括嵌套组件），他们的属性都放在最顶部的vue对象上，然后统一通过这个对象来操作属性，这样能保证父子组件数据同步
    	return {
    		className:"wrapper-content",
    		title:"头部title",
        	firstName:"chen",
        	lastName:"jiajie",
        	age:25
        }
    },

    /*vue生命周期(一般只用到mounted，就是页面渲染完成以后) start*/
    // beforeCreate:function(){
    //     // this.$data和this.$el为null
    // },
    // created:function(){
    //     //this.$data 已经保存
    // },
    // //this.$el被初始化
    // beforeMount:function(){
    //     this.$data.closePop.bind(this);
    // },
    mounted:function(){

    	//插入以后，直接应用导航栏插件
        new Nav.Nav({
        	wrapper:document.getElementById("nav-wrapper"),//导航栏插入到哪个元素中
        	autoFold:true,//点击文件夹名称是否展开文件夹【false的话，只有点击折叠符号才会折叠文件夹】
        	switchScene:function(pageId,isFolder){//点击文件夹或者点击文件夹里面的文件的时候的事件
        		if(isFolder){//点击文件夹名称
        			return //点击的是文件夹的话，执行额外的操作
        		}
        		else{//点击的不是文件夹，就直接跳转到对应页面
        			switch (pageId) {
	        			case 1:{
	        				location.href="http://localhost:8080/build/assets/pages/demo.html#5";
	        				break;
	        			}
	        			default:{
	        				debugger
	        				location.href="http://www.baidu.com";
	        				break;
	        			}
	        		}
        		}
	        		
        	},

        	//导航栏菜单数据结构【相同的结构可以无限叠加，层数不限，样式可以后期再改，该留的接口都留了】
        	nodeList:[{
		        "nodeName": "网校",//展示的名称
		        "className":"icon1",//元素的class名称
		        "children": [{//有child说明他是个文件夹，否则就只是一个链接
		            "nodeName": "机构-沿途",
		            "className":"icon14",
		            "children": [{
		                "nodeName": "业务单元A",
		                "className":"icon4"
		            }, {
		                "nodeName": "业务单元B",
		                "className":"icon18"
		            }]
		        }, {
		            "nodeName": "机构-尚客",
		            "className":"4"
		        }]
		    }]
        });

        debugger
        var param=this.getParams();//调用methods里面的方法，直接用this.方法名

        hj.ajax(param);
    },
    // beforeUpdate:function(){

    // },
    // updated:function(){

    // },
    // beforeDestroy:function(){

    // },
    // destroyed:function(){

    // },
    /*生命周期 end*/
        

    //vue 计算属性
    computed:{
    	//这个其实也算是data中的属性，展示他会随着其他属性的变化而变化
        fullName:function(){
            return this.firstName+this.lastName;
        }
    },

    //vue的方法对象，可以放一些业务类的方法
    methods:{//this.$options.methods来获取

        //获取页面初始信息请求所需要的参数
        getParams: function(opts,scope) {
            return {
                isMock: true,
                // mockUrl: "index-mock.js",/*如果想要定制对应的文件作为js，那么就要设置这个，如果不设置，默认走的是mock.js*/
                url: "crm/OrganizationV2/GetNodeByUserId", //实际url
                // url:{
                // 	dev:"crm/OrganizationV2/GetNodeByUserId"
                // },
                type: "get",
                data: {
                    userid: 330
                },
                success:function(data){
                	console.log(data);
                }
            };
        },

        //html中绑定的click事件
        clickPage:function(){
        	this.$data.firstName="mao";
        	this.$data.lastName="yun";

        }
    }

});

export default {}