ori={};

(function(){
var model={};

ori.model=model;

var pro={bind:function(local){console.log(self.tmpl.render(local));}};

var mc=function(tmpl){this.tmpl=tmpl;};

$("*.orion").each(function(index,ele){
    console.log(ele.innerText);
    try{
    var template = Hogan.compile(ele.innerText);
    model[ele.id]=Object.create(pro,{tmpl:template});
    }catch(e){console.log(e);}
});

/*
var team = ['dhg', 'fat', 'jimio', 'nickgreen', 'sayrer']
.map(function (twitterer) {
  return template.render({name: twitterer });
});
*/
})();

/*
exports={};
exports.event={};
exports.control={};
exports.model={};
exports.view={};
exports.utils={};
*/

ori.model["a"].bind({a:"aaa"});
