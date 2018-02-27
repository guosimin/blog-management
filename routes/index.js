const router = require('koa-router')()
const fs = require('fs');
const __copy = require('g_common_fn').copy;

/**
 * 录入博文
 */

function write(link,data,callBack) {
var page = `---
layout: post
title:  "${data.title}"
date:    ${data.date+" +0800"}
categories: "${data.categories?(data.categories+'...'):''}"
tags: ["chrome"]
---
${data.desc}
`;
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
    // console.log(`${JSON.stringify(data)},ctx.request.body`);
    var link = './views/blog/'+data.time+"-"+data.title+'.html';
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
