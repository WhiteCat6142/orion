Orion=(function(){
    var mixin={};
    var vv=function(value){
        if(!value)return undefined;
        switch(typeof value){
            case "function":return value();
            default:return value;
    }};
    mixin.html=function(ele,value){ele.empty().append(vv(value));};
    mixin.hidden=function(ele,value){if(vv(value))ele.hide();};
    mixin.click=function(ele,value){ele.click(value);};
    mixin.listen=function(ele,value){};
    return function(data,parent){
        for(var e in data){
            if(e[0]=="#"||e[0]=="."||e[0]=="&"){
                var e0=(e[0]=="&")?e.substr(1):e;
                var ele=(parent)?parent.find(e0):$(e0);
                Orion(data[e],ele);
            }else{
                mixin[e](parent,data[e]);
                if(e="click")delete data[e];
            }
        }
        if(!parent)return {update:function(){Orion(data);}}
    };
})();

var s="";
var x=Orion({".orion":{
    click:function(){s+="click";x.update();},
    "&p":{html:function(){return s;}}
}});
    /*
"#nb":{
".res":{
html:function(){},
hidden:function(){}
},
"&form":{
html:function(){}
}
},
"&table#threads":{
"&>tbody>tr":{
"td:nth-child(1)":{click:function(){console.log("click");}},
"td:nth-child(2)":{html:function(){return $(".a");}},
hidden:function(){}
}
}
});*/