const router = require('koa-router')()
const fs = require('fs');
const __template = require('../public/template/index');
const mongodb = require('./common/mongo');
const func = require('./common/func');


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
router.post('/fs', async(ctx, next) => {
    let data = ctx.request.body;
    let mongoPostData = {
        tableName:'article',
        obj:{
            title: func.trim(data.title),
            desc: func.trim(data.desc),
            categories: func.trim(data.categories),
            content:func.trim(data.content),
            author:'',
            create_time: new Date().getTime(),
            status: 1,
            update_time: new Date().getTime(),
            vister_number:0
        }
    };
    if(!data.isEditor){
        await mongodb.insert(mongoPostData);
    }else{
        mongoPostData = Object.assign({oldObj:data.oldObj},mongoPostData)
        await mongodb.update(mongoPostData);
    }

    let dataType = data.dataType||'';
    if(dataType!='save'){
        let link =`./build/${dataType}/${data.time}-${data.title}.html`;
        await new Promise(function (resolve, reject) {
            //先删除文件
            fs.unlink(link, (err) => {
                // 然后重新写入
                write(link,data,(err) => {
                    ctx.response.body = {
                        success:true,
                        message:data.isEditor?'博文修改成功并已生成':'博文保存成功并已生成'
                    };
                    resolve();
                });
            });
        });
    }else{
        await new Promise(function (resolve, reject) {
            ctx.response.body = {
                success:true,
                message:data.isEditor?'博文修改成功':'博文保存成功'
            };
            resolve();
        });
    }
});

/**
 * 路由相关
 */
router.get('/', async (ctx, next) => {
    ctx.state.appName = '博客发布';
    ctx.state.data ={
        tpl:'editor'
    }
    ctx.state.data.menuList = await mongodb.find({
        tableName:'menu',
        obj:{}
    });
    await ctx.render('index/index', {
        title: 'Hello Koa 2!'
    });
});

router.get('/release', async (ctx, next) => {
    ctx.state.appName = '博客发布';
    ctx.state.data ={
        tpl:'editor'
    }
    ctx.state.data.menuList = await mongodb.find({
        tableName:'menu',
        obj:{}
    });
    await ctx.render('index/index', {
        title: 'Hello Koa 2!'
    });
});

router.get('/list', async (ctx, next) => {
    ctx.state.appName = '管理博客';
    ctx.state.data ={
        tpl:"list"
    }
    ctx.state.data.menuList = await mongodb.find({
        tableName:'menu',
        obj:{}
    });
    ctx.state.data.list =await mongodb.find({
        tableName:'article',
        obj:{},
        sort:{create_time:-1}
    });
    await ctx.render('index/index');
});

router.get('/list/editor', async (ctx, next) => {
    ctx.state.appName = '编辑博客';
    ctx.state.data ={
        tpl:"editor"
    }
    ctx.state.data.menuList = await mongodb.find({
        tableName:'menu',
        obj:{}
    });
    ctx.state.data.list =await mongodb.find({
        tableName:'article',
        obj:{
            title:ctx.query&&ctx.query.name||''
        }
    });
    await ctx.render('index/index');
});

module.exports = router;
