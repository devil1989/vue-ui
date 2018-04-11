//vue使用demo：没有用到vuex


require('../styles/login.scss');
import Pop from 'v-pop';//Vue的弹框组件,在componnet的alert中
import Login from '../components/login';//Vue的弹框组件,在componnet的alert中


Vue.config.devtools = true;

/*
    data,props,computed,都是存放VUE的数据的引用类型：（不用vuex的情况下）
        父组件改变props，子组件如果直接使用props，会触发子组件更新
        父组件改变props，子组件如果将props放进data中再使用，不会触发子组件更新
        父组件改变props，子组件如果将props放进computed中再使用，会触发子组件更新
        data，props和computed的变化都会触发组件更新
*/

let loginPageVue=new Vue({

	//vue的root元素
    el: '#app',

    //vue的数据
    data:function(){

    	//所有的vue组件（包括嵌套组件），他们的属性都放在最顶部的vue对象上，然后统一通过这个对象来操作属性，这样能保证父子组件数据同步
    	return {
        	firstName:"chen",
        	lastName:"jiajie",

        	//大写的属性都是指向vue组件的options
        	Login:{
        		title:"初始登录456789",
        		userName:"chenjiajie",
        		password:"789",
        		loginTxt:"登录55",
        		loginClick:function(){
        			//this是login组件，this.$root是这个页面的vue元素
        			var rootOpt=this.$root.$options;//vue元素的$options指向自己【this.$root是vue元素对象】
        			var currentOpt=this.$props.options;//vue组件的this就是指向自己【this就是vue组件对象】
        			var param= rootOpt.methods.getParams(currentOpt,this.$root);
        			hj.ajax(param);
        		}
        	},
			Pop: {
				data: {
					destroy: false, //销毁pop
					title: "pop",
					needShow: true,
					closeName: "",
					btns: [{
						txt: "确认",
						callback: function(e) {
							//this指的是pop组件，this.$root是这个页面的vue元素
							this.hide && this.hide();
						}//注意，如果想获取这个vue的上下文，必须在这里bind(this)
					}]
				},
				inheritContent: ""
			}
        }
    },
        

    //vue 计算属性
    computed:{
    	//这个其实也算是data中的属性，展示他会随着其他属性的变化而变化
        fullName:function(){
            return this.firstName+this.lastName;
        },
        sex:{
        	//获取的时候计算
        	get:function(){},

        	//重新设置的时候计算
        	set:function(){}
        }
    },

    //vue 监听属性
    watch:{
    	//方法名称就是data中的属性名，设置firstName的时候，就会执行这个方法，用这个可以联动其他属性
    	firstName: function (val) {
	      	this.userName = val + ' ' + this.firstName;
	    },
	    age:function(val){
	    	this.age=this.userName+this.age;
	    }
    },

    //vue的方法对象，可以放一些业务类的方法
    methods:{//this.$options.methods来获取

        //获取页面初始信息请求所需要的参数
        getParams: function(opts,scope) {
            return {
                isMock: true,
                // mockUrl: "index-mock.js",/*如果想要定制对应的文件作为js，那么就要设置这个，如果不设置，默认走的是mock.js*/
                // url: "crm/OrganizationV2/GetNodeByUserId", //实际url
                url:{
                	dev:"crm/OrganizationV2/GetNodeByUserId"
                },
                type: "get",
                data: {
                    userid: 330
                },
                success:function(){
                	debugger
                }
            };
        }
    }

});

export default {}