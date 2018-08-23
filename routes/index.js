const router = require('koa-router')()
const fs = require('fs');
const __copy = require('g_common_fn').copy;

/**
 * 录入博文
 */

function write(link,data,callBack) {
    if(data.dataType=='html'){
var page = `<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<title>${data.title}</title>
	</head>
	<body>
        ${data.desc}
    </body>
</html>    
`;
    }else{
var page = `---
layout: post
title:  "${data.title}"
date:    ${data.date+" +0800"}
categories: "${data.categories?(data.categories+'...'):''}"
tags: ["chrome"]
---
${data.desc}
`;
    }

    fs.appendFile(link, page, 'utf8', function(err){
        if (err){
            throw err
        };
        if(typeof callBack == 'function'){
            callBack(err);
        }
    });
}


/**
 * 路由相关
 */

router.get('/', async (ctx, next) => {
  ctx.state.appName = '后台管理';
  await ctx.render('index/index', {
    title: 'Hello Koa 2!'
  });
});

router.post('/fs', (ctx, next) => {
    var data = ctx.request.body;
    var dataType = 'blog';
    if(data.dataType=='html'){
        dataType = 'html';
    }
    // console.log(`${JSON.stringify(data)},ctx.request.body`);
    var link = './views/'+dataType+'/'+data.time+"-"+data.title+'.html';
    return new Promise(function (resolve, reject) {
        fs.unlink(link, (err) => {
            write(link,data,(err) => {
                ctx.response.body = {
                    success:true,
                    message:err?'博文已被创建':'博文已被更新'
                };
                resolve();
            });
        });
    });
});


module.exports = router;
