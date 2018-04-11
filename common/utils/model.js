/*
 *author:chenjiajie
 *date:2017/08/11
 *description:和后端交互的ajax请求的基础封装，用于对所有请求的统一监控，以及请求url的统一管理
 *该模块依赖utils文件,所以在common文件中，应该先require utils.js，再require model.js
 */

(function(){
	window.hj=window.hj||{};
	var url=location.host||"";

	//线上环境不能用local开头
	if(/^local/gi.test(url)){
		hj.env="dev";//本地开发环境
	}
	else if(/^qa/gi.test(url)){
		hj.env="qa";//测试环境
	}
	else if(/^yz/gi.test(url)){
		hj.env="yz";//验证环境（生产环境数据，数据和线上一样）
	}
	else{
		hj.env="prod";//生产环境（线上环境）
	}
})();


/*
 *mock数据用法：hj.ajax({
	参数和$.ajax相同，下列参数除外（isMock【可选】，mockUrl【可选】，url【必选】）
	isMock: true,//是否mock,//为true的时候，需要把url中对应的链接放到mock.js中（url为字符串时，mock.js中需要填写的就是url；url为函数的时候，填写的是return的值；url为对象的时候，返回的是dev的值）
    mockUrl: "index-mock.js",//如果不设置，默认走的是mock.js

	//url属性最复杂，规则如下
	url："/crm/getUser"//最终产生的是本地的host+url
	url：function(){return "/crm/getUser"}//最终产生的就是return的url
	url：{
		dev:"/crm/getUser", //表示dev环境下是location.origin+"/crm/getUser"
		qa:"/crm/getUser",
		yz:"/crm/getUser",
		prod:"/crm/getUser",
		host:"www.baidu.com"//如果不设置host，那么走的是默认的location.host
	}
 })
 */
function model(opts){//对ajax进行二次封装，添加环境区分和mock请求
	var key="";

	//获取真实的url
	if(Object.prototype.toString.call(opts.url) === "[object Function]"){
		key=opts.url(opts);//key为对应的返回地址
		opts.url=opts.url(opts);//执行函数，返回绝对的url
	}else if(Object.prototype.toString.call(opts.url) === "[object String]"){
		key=opts.url;//key为设置的值
		opts.url="//"+location.host+opts.url;
	}else if(Object.prototype.toString.call(opts.url)=== "[object Object]"){
		key=opts.url[hj.env];//key为对应环境下的值，dev下为dev的值
		opts.url=(opts.url.host||"")+opts.url[hj.env]||"";//根据环境获取url
	}

	if(opts.isMock){//是否需要mock

		//mockUrl是直接到pages文件夹下，只要指定文件名加参数即可，例如
		var mockFileName=(opts.mockUrl||"mock.js").replace(/\?[\s\S]*/,"");//url是对于的index.store.js这个mock数据的js文件，后面的key和case分别是页面中对于的那个请求，以及该请求的某个case，有时候我们需要保存一个请求的多个mock数据以便切换
		//少年们千万注意，json是不支持任何注释的，不支持//和/**/，千万别犯傻
		//ensure中的是依赖的js文件，ensure中不支持任何变量，
		//ensure的callback中require进来的js，都是异步加载的js，他们会合ensure中的依赖项打包在一起，但是依赖的js不会执行，只会执行ensure的callback中require的js文件
        require.ensure([],function(require){//require.ensure以当前文件地址为基准，而不是打包合并后的地址+url //"../../vue-demo/mock/index-mock.js"

        	var backData=require("../../mock/"+mockFileName);//require加载模块的时候，需要一个基础的路径，require会把这个路径下的所有文件都作为模块处理（require.context可以支持完全的变量）
        	var data=backData.data;

        	if(!data){
        		console.log("mock请求url不对，mock数据的url以pages文件夹为base文件夹;mock url例子:index.store.js");
        	}

        	if(!key){
        		console.log("mock数据不存在，请在"+mockFileName+"这个文件中添加对应的"+key+"属性以及它的mock数据");
        		opts.success&&opts.success(data[key]);
        	}

        	setTimeout(function(){
    			opts.success&&opts.success(data[key]);
    		},100);
        });
    }
    else{
		$.ajax&&$.ajax(opts);
    }
}

hj.ajax=model;//走统一model

module.exports.model=model