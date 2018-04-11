import Title from 'v-title';//引用其他公共的组件或者js文件
import Box from 'v-box';


Vue.config.devtools = true;

let loginPageVue=new Vue({

    el: '#app', //this.$el来获取这个元素

    data:function(){//this.$data来获取
    	return {
    		pop:{//传入pop组件数据
                name:"Title",//动态组件名称
                display:"show",
                validate:function(){//校验是否通过

                },
                children:"<ul><li>12</li><li>34</li></ul><p>789654</p>",//内部组件，如果不需要组件，可以用string作为内部的html
                v_closeName:"",//组件关闭文字，默认是x
                v_beforeClick:function(){
                },
                v_afterClick:function(){
                }
    		}
        }
    },
    beforeCreate:function(){
        //如何使用
        var title=Vue.component("Titles",Title);//默认是自定义的名称
    }

});

let boxDemo=new Vue({

    el: '#app-box', //this.$el来获取这个元素

    data:function(){//this.$data来获取
        return {
            /*
             desc:name,className,destroy,hide,inner是所有组件的通用属性
             */
            pop:{//传入pop组件数据
                name:"Box",//动态组件名称
                className:"jeffrey",
                children:"<ul><li>12</li><li>34</li></ul><p>789654</p>",//内部组件，如果不需要组件，可以用string作为内部的html
            }
        }
    },
    beforeCreate:function(){
        //如何使用
        var box=Vue.component("Box",Box);//默认是自定义的名称
    }

});

export default {}