
import Common from "../basic" ;
let templates=require("./index.html");
let Pop = {
    data:function(){
        return {};
    },

    props:{
        options:{//所有属性都是选填
            name:"Pop"//组件默认名称是Pop，可以自定义
            // children:"<p>789654</p><div>jeffreychen</div>"
        }
    },

    methods: {},
    template:templates
};

var s=Common;
Pop=Object.assign(Common,Pop);

export default Pop;

