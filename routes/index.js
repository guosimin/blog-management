const router = require('koa-router')()
const fs = require('fs');
const __template = require('../public/template/index');
const mongodb = require('./common/mongo');

/**
 * 录入博文
 */

function write(link,data,callBack) {
    var page = data.dataType=='html'?__template.html(data):__template.blog(data);

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
    ctx.state.data ={
        tpl:'release'
    }
  await ctx.render('index/index', {
    title: 'Hello Koa 2!'
  });
});

router.get('/release', async (ctx, next) => {
    ctx.state.appName = '博客发布';
    ctx.state.data ={
        tpl:'release'
    }
    await ctx.render('index/index', {
        title: 'Hello Koa 2!'
    });
});

router.get('/list', async (ctx, next) => {
    ctx.state.appName = '管理博客';
    ctx.state.data ={
        tpl:"list"
    }
    ctx.state.data.list =await mongodb.find({
        tableName:'list',
        obj:{}
    });
    await ctx.render('index/index');
});


router.post('/fs', async(ctx, next) => {
    let data = ctx.request.body;
    let dataType = 'blog';
    if(data.dataType=='html'){
        dataType = 'html';
    }
    // console.log(`${JSON.stringify(data)},ctx.request.body`);
    let link = './build/'+dataType+'/'+data.time+"-"+data.title+'.html';
    await mongodb.update({
        tableName:'list',
        obj:{
            title: data.title,
            desc: data.desc,
            categories: data.categories,
            time: new Date().getTime(),
            dataType: dataType==1?1:2,
            date: new Date().getTime()
        }
    });
    await new Promise(function (resolve, reject) {
        //先删除文件
        fs.unlink(link, (err) => {
            // 然后重新写入
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
