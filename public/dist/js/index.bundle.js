!function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){let n=new(0,window.wangEditor)("#input-area__textarea");n.customConfig.uploadImgShowBase64=!0,n.create(),$(".input-area__btn").click(function(){if($("#input-area__input").val()&&n.txt.html()){let t=moment(),e="";"html"==$(this).data("type")&&(e="html"),$.ajax({url:"/fs",method:"post",contentType:"application/json",data:JSON.stringify({title:$("#input-area__input").val(),desc:n.txt.html(),categories:$("#input-area__categories").val(),time:t.format("YYYY-MM-DD"),dataType:e,date:moment().format("YYYY-MM-DD HH:mm:ss")}),dataType:"json",success:function(){alert("保存成功")}})}else layer.msg("请输入标题和内容")}),$("#input-area__clear").click(function(){$("#input-area__input").val(""),n.txt.clear()})}]);