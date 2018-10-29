const router = require('koa-router')();
const mongodb = require('./common/mongo');

router.prefix('/users')

router.get('/', async (ctx, next) => {
    ctx.state.appName = '用户列表';
    ctx.state.data ={
        tpl:'users'
    }
    ctx.state.data.menuList = await mongodb.find({
        tableName:'menu',
        obj:{}
    });
    ctx.state.data.list = await mongodb.find({
        tableName:'users',
        obj:{}
    });
    await ctx.render('index/index', {
        title: 'Hello Koa 2!'
    });
});
module.exports = router;
