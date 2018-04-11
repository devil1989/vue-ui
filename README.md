本demo没有用到vuex，打包还是和原来的一样，只是添加了一些nav组件，pop组件等（VueWeb中的组件封装的不够好，这里重新封装了）



/***************************必读 start****************************/

项目安装：
    1.确保本地node版本是6.10.0或者6.10.3（没安装的话去淘宝镜像安装）
    2.npm install webpack -g
    3.npm install --registry=http://registry.fe.yeshj.com 
    4.本地启动 ：npm start (mac启动用npm run start-mac)
    注意点（与src文件同一级的目录文件夹dist和build，如果不存在的话，需要手动创建）

启动命令：（开发的时候只要npm start 即可）
    npm start ：启动本地node进入开发环境，分地址是http://localhost:8080

打包命令：
    npm run dev : dev环境下把文件打包到build文件夹
    npm run qa : qa环境下把文件打包到dist文件夹, 同时会自动执行postqa命令，把对应的html文件拷贝到对应目录
    npm run yz ： yz环境下把文件打包到dist文件夹,同时会自动执行postyz命令，把对应的html文件拷贝到对应目录
    npm run prod ： prod环境下把文件打包到dist文件夹 同时会自动执行postprod命令，把对应的html文件拷贝到对应目录


本地开发地址：http://localhost:8080/build/assets/pages/文件名.html

src：项目开发文件夹(需要上传)
build：项目编译后的文件夹（不上传）
dist：项目编译+压缩的文件夹（不上传）
项目prod环境打包完成以后，会把html文件自动拷贝到java对应的资源目录（只是html文件）
发布的时候，需要先把js和css等静态资源发送到yz服务器和线上服务器


/***************************必读 end****************************/













/***************************选读 start****************************/

# vue-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).





webpack.dev.js:webpack的本地配置文件（不需要上传）
package.json:node的所有插件的配置文件，到这个文件的目录下，直接npm install，就能把所有的需要的插件放到node_modules文件夹下
node_modules:node模块,包含了grunt，webpack，还有这两个打包工具用到的插件等

vue-demo项目
        gruntfile.js:grunt打包配置文件
        .gitignor:git提交的时候需要忽略的文件
        webpack.config.js:webpack配置文件(需要上传)
        build:src经过转义后的文件夹
        dest：压缩好以后的文件
        mock：模拟请求
        src:原始文件夹
        		assets:图片+样式+icon font
                images:图片
                styles：样式
        		
            pages：.vue文件 (对应各个网页的js，vue，html文件；每个页面都包含三个文件)
        		store：(只为了生成一个新vuex的store，里面包含了actions和mutations)
                store文件（例如index.store.js）中包括了index页面对应的action，mutations，然后用vuex把store封装成一个支持vuex去管理状态的新store
        		
            components:项目内的组件（零碎的vue组件，多个零碎的vue组件合成一个网页的vue组件）

common项目：多个项目通用的common文件夹，他有一个单独的git仓库，每次项目提交之前，得先把common这个公共仓库代码拉下来，保持最新
                          （common不和其他项目并行，而是包含在里面，，因为webpack会使用common文件夹内的文件，但是webpack又是以项目为单位，在项目文件夹下，
                          所以如果common和项目平级，就拿不到common里面的内容了）
            utils:通用文件，例如cookie操作，埋点js，通用的ajax请求基础url等
            libs：第三方js仓库
            styles:所有项目公共的css
            componnet：所有项目公用的组件
            include：所有项目公用的头部，底部等html文件









common有一个线上的公用git地址（已存在组件除了修bug不允许修改，只允许以他为基础去拓展其他插件）
每个project也都维护一个公共地址
项目开发完成以后，提交common和project这两个项目，发布的时候先发布common，再发布project（否则依赖的common没上线，会导致错误）
为了项目迁移考虑，引用common得有一个统一的前置URL路径

webpack：
    webpack如何调试
    打包环境划分
    热插拔+sourcemap方便开发调试
    支持异步加载（以免一个页面太大）
    es6，sass支持
    js，css压缩
    模块分块打包
    文件拷贝 ok
    CommonsChunkPlugin：把所有公共页面的模块抽离出来放到common这个文件中去
    extract-text-webpack-plugin：希望项目的样式能不要被打包到脚本中，而是独立出来作为.css
    html-webapck-plugin：生产html的插件：每次生成的html，里面的script、link后面会动态添加hash，防止html中的文件缓存

项目构建考虑点：
    1.技术架构考虑
    2.项目路径迁移考虑
    3.公共框架迁移考虑
    4.项目SEO，性能考虑（是否用node做中间层）
    5.项目可拓展性考虑
    6.项目可调式



--display-error-details


/***************************选读 end****************************/