import Vue from 'vue';//完整版，不但包含运行时，还包含调试文件
window.Vue=Vue;
require("../../../../common/libs/underscore.js");
require("../../../../common/libs/jquery-1.8.3.min.js");

//ie8的es5兼容
require("../../../../common/libs/shim/es5-shim.min.js");
require("../../../../common/libs/shim/es5-sham.min.js");

//常用js函数
require("../../../../common/utils/utils.js");

//公共的model模块，依赖于utils.js，需要放后面
require("../../../../common/utils/model.js");
require("../../../../common/styles/reset.css");
require("../styles/common.scss");
// require("../../../../common/utils/utils.js");//为什么这行屌代码总是报错，因为common这个文件在webpack所安装的项目之外，而js中的require和impor又依赖webpack；需要把weipack安装到common目录同级
// require("../../../../common/utils/model.js");//公共的model模块，依赖于utils.js，需要放后面
// require("../../../../common/utils/spa.js");//单页面应用程序
// require("../../../common/styles/bootstrap.min.css");//报错是因为bootstrap.min.css引入了，但是相对路径下面的eot，svg，woff文件没有放进来，不是打包脚本的问题
// require("../../../../common/styles/base.scss");